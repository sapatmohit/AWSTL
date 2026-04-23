package com.example.registration;

import jakarta.validation.constraints.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class Ass9Application {
    public static void main(String[] args) {
        SpringApplication.run(Ass9Application.class, args);
    }
}

class UserRegistrationDto {
    // Step 1: Basic Info
    @NotBlank(message = "Full name is required")
    @Size(min = 3, message = "Name must be at least 3 characters")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Name must contain only alphabets")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Enter a valid 10-digit phone number")
    private String phone;

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 20)
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Only letters, numbers, underscore allowed")
    private String username;

    // Step 2: Security
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Minimum 8 characters required")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$", 
             message = "Must include uppercase, lowercase, number, and special character")
    private String password;

    @NotBlank(message = "Confirm your password")
    private String confirmPassword;

    // Step 3: Personal Details
    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    private String gender;
    
    @NotBlank(message = "Country is required")
    private String country;
    
    @NotBlank(message = "State is required")
    private String state;
    
    @NotBlank(message = "City is required")
    private String city;
    
    @NotBlank(message = "Education level is required")
    private String educationLevel;

    // Step 4: Academic
    @NotBlank(message = "Field of study is required")
    private String fieldOfStudy;
    
    @NotEmpty(message = "Select at least one subject")
    private List<String> subjects = new ArrayList<>();
    
    @NotEmpty(message = "Select at least one learning goal")
    private List<String> learningGoals = new ArrayList<>();

    // Step 5: Verification
    @NotBlank(message = "OTP is required")
    @Size(min = 6, max = 6, message = "OTP must be 6 digits")
    private String otp;
    
    @NotBlank(message = "Captcha verification required")
    private String captchaToken;

    // Step 6: Final
    @AssertTrue(message = "You must accept terms and conditions")
    private boolean acceptTerms;
    
    private boolean subscribeNewsletter;

    // Custom check for age and password match
    public boolean isPasswordMatch() {
        return password != null && password.equals(confirmPassword);
    }

    public boolean isOldEnough() {
        if (dateOfBirth == null) return false;
        return Period.between(dateOfBirth, LocalDate.now()).getYears() >= 13;
    }

    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getEducationLevel() { return educationLevel; }
    public void setEducationLevel(String educationLevel) { this.educationLevel = educationLevel; }
    public String getFieldOfStudy() { return fieldOfStudy; }
    public void setFieldOfStudy(String fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; }
    public List<String> getSubjects() { return subjects; }
    public void setSubjects(List<String> subjects) { this.subjects = subjects; }
    public List<String> getLearningGoals() { return learningGoals; }
    public void setLearningGoals(List<String> learningGoals) { this.learningGoals = learningGoals; }
    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }
    public String getCaptchaToken() { return captchaToken; }
    public void setCaptchaToken(String captchaToken) { this.captchaToken = captchaToken; }
    public boolean isAcceptTerms() { return acceptTerms; }
    public void setAcceptTerms(boolean acceptTerms) { this.acceptTerms = acceptTerms; }
    public boolean isSubscribeNewsletter() { return subscribeNewsletter; }
    public void setSubscribeNewsletter(boolean subscribeNewsletter) { this.subscribeNewsletter = subscribeNewsletter; }
}

@Controller
@RequestMapping("/")
class RegistrationController {

    @GetMapping
    public String showForm(Model model) {
        model.addAttribute("user", new UserRegistrationDto());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@jakarta.validation.Valid @ModelAttribute("user") UserRegistrationDto user, 
                               BindingResult result, Model model) {
        
        // Manual additional checks
        if (!user.isPasswordMatch()) {
            result.rejectValue("confirmPassword", "error.user", "Passwords do not match");
        }
        if (!user.isOldEnough()) {
            result.rejectValue("dateOfBirth", "error.user", "You must be at least 13 years old");
        }

        if (result.hasErrors()) {
            return "register";
        }
        model.addAttribute("message", "Registration Successful! Welcome to the platform.");
        model.addAttribute("regUser", user);
        return "success";
    }
}
