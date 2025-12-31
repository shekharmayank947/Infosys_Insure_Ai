// package com.insurai.backend.service;

// import org.springframework.stereotype.Service;
// import com.insurai.backend.entity.User;
// import com.insurai.backend.repository.UserRepository;

// @Service
// public class UserService {

//     private final UserRepository userRepository;

//     public UserService(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     // REGISTER
//     public User register(User user) {
//         user.setRole("USER");
//         return userRepository.save(user);
//     }

//     // LOGIN
//     public User login(String email, String password) {
//         return userRepository.findByEmail(email)
//                 .filter(u -> u.getPassword().equals(password))
//                 .orElse(null);
//     }
// }
package com.insurai.backend.service;
import com.insurai.backend.dto.RegisterRequest;
import com.insurai.backend.dto.LoginResponse;
import com.insurai.backend.entity.User;
import com.insurai.backend.repository.UserRepository;
import com.insurai.backend.security.JwtUtil;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
     private final PasswordEncoder passwordEncoder;
    // private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // REGISTER
    // public User register(User user) {
    //     user.setRole("USER");
    //     user.setPassword(passwordEncoder.encode(user.getPassword())); // 🔐 encrypt
    //     return userRepository.save(user);
    // }
    public void register(RegisterRequest request) {

    User user = new User();
    user.setName(request.getFullName());
    user.setEmail(request.getEmail());
    user.setRole(request.getRole()); // or "USER"
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    userRepository.save(user);
    System.out.println("USER SAVED: " + user.getEmail());
}

    // LOGIN + TOKEN
    public LoginResponse loginAndGenerateToken(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // String token = jwtUtil.generateToken(
        //         user.getEmail(),
        //         user.getRole()
        // );
        String token = jwtUtil.generateToken(user.getEmail());


        return new LoginResponse(
                token,
                user.getEmail(),
                user.getRole(),
                user.getName()
                
        );
    }
}
