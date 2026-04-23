package com.example.feedback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SpringBootApplication
public class Ass8Application {
    public static void main(String[] args) {
        SpringApplication.run(Ass8Application.class, args);
    }
}

@Service
class FeedbackService {
    private final FeedbackRepository repository;

    public FeedbackService(FeedbackRepository repository) {
        this.repository = repository;
    }

    public List<Feedback> getAllFeedback() {
        return repository.findTop10ByOrderByCreatedAtDesc();
    }

    public void saveFeedback(Feedback feedback) {
        repository.save(feedback);
    }

    public Map<String, Long> getTopicFrequency() {
        return repository.findTopTopicsJPQL().stream()
                .collect(Collectors.toMap(
                        obj -> (String) obj[0],
                        obj -> (Long) obj[1]
                ));
    }

    public String exportToCsv() {
        StringBuilder csv = new StringBuilder("ID,Customer,Topic,Rating,Comments,Date\n");
        repository.findAll().forEach(f -> {
            csv.append(f.getId()).append(",")
               .append(f.getCustomerName()).append(",")
               .append(f.getTopic()).append(",")
               .append(f.getRating()).append(",")
               .append("\"").append(f.getComments().replace("\"", "\"\"")).append("\",")
               .append(f.getCreatedAt()).append("\n");
        });
        return csv.toString();
    }
}

@Controller
@RequestMapping("/")
class FeedbackController {
    private final FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    @GetMapping
    public String index(Model model) {
        model.addAttribute("feedbacks", service.getAllFeedback());
        model.addAttribute("topics", service.getTopicFrequency());
        model.addAttribute("newFeedback", new Feedback());
        return "index";
    }

    @PostMapping("/submit")
    public String submitFeedback(@ModelAttribute Feedback feedback) {
        service.saveFeedback(feedback);
        return "redirect:/";
    }

    @GetMapping("/export")
    @ResponseBody
    public String exportCsv(jakarta.servlet.http.HttpServletResponse response) {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=feedback_report.csv");
        return service.exportToCsv();
    }
}
