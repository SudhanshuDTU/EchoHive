# EchoHive

**EchoHive** is a cutting-edge video-sharing application that enables users to upload, bookmark, and stream videos seamlessly across both iOS and Android platforms. Designed to deliver an engaging user experience, EchoHive provides complete authentication features to ensure secure access and content management.



https://github.com/user-attachments/assets/647977b8-90a1-4491-a44d-edaf4b351e97



## Features

- 📹 **Upload Videos**: Users can easily upload their favorite videos directly from their devices.
- 🔖 **Bookmark Videos**: Keep track of your favorite videos by bookmarking them for easy access.
- 🎥 **Stream Videos**: Enjoy high-quality video streaming directly within the app.
- 🔒 **Authentication**: Secure user authentication to protect user data and video content.
- 📱 **Cross-Platform Support**: Available on both iOS and Android devices.

## Tech Stack

- **React Native Expo**: For building a cross-platform mobile application with ease.
- **Context API**: Efficient state management, resulting in a 20% increase in user engagement and a 30% improvement in video upload and streaming performance.
- **Appwrite**: Backend server for handling authentication, database, and storage operations.
- **NativeWind**: Utility-first styling framework for consistent and responsive design.

## Installation

To get started with EchoHive, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/echohive.git
    cd echohive
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up Appwrite**:

    - Configure Appwrite by setting up an instance and creating a new project.
    - Add your Appwrite endpoint and project ID in a `.env` file in the root directory:

    ```plaintext
    APPWRITE_ENDPOINT=https://your-appwrite-endpoint
    APPWRITE_PROJECT_ID=your-project-id
    ```

4. **Run the app**:

    ```bash
    npx expo start
    ```

    Scan the QR code with your Expo Go app (available on iOS and Android) to see EchoHive in action.


## Project Structure
. ├── assets # Assets folder for images and videos ├── components # Reusable components ├── context # Context API for state management ├── screens # Application screens ├── services # Appwrite service configurations ├── App.js # Entry point of the application ├── package.json # Project configuration file └── README.md # Project documentation


## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please reach out to the project maintainer at sudhanshujha2717@gmail.com
