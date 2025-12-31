

package com.insurai.backend.controller;
import com.insurai.backend.dto.LoginRequest;
import com.insurai.backend.dto.LoginResponse;
import com.insurai.backend.dto.RegisterRequest;
import com.insurai.backend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.insurai.backend.entity.User;
import com.insurai.backend.repository.UserRepository;
import com.insurai.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // frontend access
// public class AuthController {

//     private final UserService userService;
     

//     public AuthController(UserService userService) {
//         this.userService = userService;
       
//     }

public class AuthController {
private final UserService userService;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil,UserService userService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }



    // REGISTER API
    // @PostMapping("/register")
    // public User register(@RequestBody User user) {
    //     return userService.register(user);
    // }
    //  @PostMapping("/register")
    // public String register(@RequestBody RegisterRequest request) {
    //     userService.register(request);
    //     return "User registered successfully";
    // }
    @PostMapping("/register")
public String register(@RequestBody RegisterRequest request) {
    System.out.println("REGISTER API HIT: " + request.getEmail());
    userService.register(request);
    return "User registered successfully";
}



    // LOGIN API
    // @PostMapping("/login")
    // public String login(@RequestBody User user) {
    //     User loggedInUser = userService.login(user.getEmail(), user.getPassword());

    //     if (loggedInUser != null) {
    //         return "Login Successful";
    //     } else {
    //         return "Invalid Email or Password";
    //     }
    // }
//  @PostMapping("/login")
//     public LoginResponse login(@RequestBody LoginRequest request) {
//         return userService.loginAndGenerateToken(
//                 request.getEmail(),
//                 request.getPassword()
//         );
    // }
  

//     @PostMapping("/login")
// public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    
//     User user = userRepository.findByEmail(request.getEmail())
//             .orElseThrow(() -> new RuntimeException("User not found"));

//     if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                 .body("Invalid password");
//     }

//     String token = jwtUtil.generateToken(user.getEmail());

//     return ResponseEntity.ok(token);
@PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {
    return userService.loginAndGenerateToken(
            request.getEmail(),
            request.getPassword()
    );
}

}








