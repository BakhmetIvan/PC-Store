package nure.pcshop.repository.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class GenericSpecificationProvider<T> implements SpecificationProvider<T> {
    private final Map<String, Function<String[], Specification<T>>> specificationMap = new HashMap<>();

    public void addSpecification(String key, Function<String[], Specification<T>> specificationFunction) {
        specificationMap.put(key, specificationFunction);
    }

    @Override
    public Specification<T> getSpecification(String key, String[] params) {
        if (!specificationMap.containsKey(key)) {
            throw new RuntimeException("No specification found for key: " + key);
        }
        return specificationMap.get(key).apply(params);
    }

    public Specification<T> createNameSpecification(String fieldName, String[] params) {
        return (root, query, criteriaBuilder) -> {
            String param = params[0].toLowerCase();
            return criteriaBuilder.like(criteriaBuilder.lower(root.get(fieldName)), "%" + param + "%");
        };
    }

    public Specification<T> createInSpecification(String fieldName, String[] params) {
        return (root, query, criteriaBuilder) -> root.get(fieldName).in(Arrays.stream(params).toArray());
    }

    public Specification<T> createRangeSpecification(String fieldName, String[] params) {
        if (params.length != 2) {
            throw new RuntimeException("Exactly 2 parameters are required for range specification.");
        }
        double from = Double.parseDouble(params[0]);
        double to = Double.parseDouble(params[1]);
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get(fieldName), from, to);
    }
}