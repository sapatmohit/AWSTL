package com.example.feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Map;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    // JPQL Query to find most frequent feedback topics
    @Query("SELECT f.topic, COUNT(f) as count FROM Feedback f GROUP BY f.topic ORDER BY count DESC")
    List<Object[]> findTopTopicsJPQL();

    // Custom Native Query for average rating per topic
    @Query(value = "SELECT topic, AVG(rating) as avg_rating FROM feedbacks GROUP BY topic", nativeQuery = true)
    List<Object[]> findAverageRatingPerTopicNative();
    
    // Find recent feedback
    List<Feedback> findTop10ByOrderByCreatedAtDesc();
}
