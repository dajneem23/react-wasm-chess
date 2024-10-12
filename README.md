# React + Wasm + Rust 
This is the frontend application for the Microservices-NATS project. It is built using React and Vite, with WebAssembly (Wasm) components written in Rust.
Sure! Here is a `README.md` file for your frontend project that uses Vite with WebAssembly in Rust:

```markdown
# Frontend with Vite and WebAssembly in Rust

This is the frontend application for the Microservices-NATS project. It is built using React and Vite, with WebAssembly (Wasm) components written in Rust.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 22 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)
- [Rust](https://www.rust-lang.org/) (latest stable version)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) (for building the Rust project)

## Setup

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/microservices-nats.git
cd microservices-nats/frontend
```

### 2. Install Dependencies

Install the necessary npm packages:

```sh
npm install
```

### 3. Build the Rust Code

Navigate to the `src/wasm` directory and run the build script to compile the Rust code to WebAssembly:

```sh
chmod +x build.sh
./build.sh
```

### 4. Run the Development Server

Navigate back to the root of the `frontend` directory and start the Vite development server:

```sh
pnpm run dev
```

Open your browser and go to `http://localhost:3000` to see the application running.

## Building for Production

To create a production build of the project, run:

```sh
npm run build
```

The production-ready files will be in the `dist` directory.

## Project Overview

This project demonstrates the integration of a frontend application using Vite and React with WebAssembly components written in Rust. The Rust code is compiled to WebAssembly using `wasm-pack` and then integrated into the React application.

### Important Files

- **src/components/App.jsx**: The main React component.
- **src/index.jsx**: The entry point of the React application.
- **src/wasm/src/lib.rs**: The Rust source code for WebAssembly.
- **src/wasm/build.sh**: The build script for compiling Rust to WebAssembly.
- **vite.config.js**: The Vite configuration file.

## Learn More

To learn more about the tools and technologies used in this project, check out the following resources:

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Rust and WebAssembly Book](https://rustwasm.github.io/book/)
- [wasm-pack Documentation](https://rustwasm.github.io/wasm-pack/)

## Contributing

If you would like to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more details.
```

This `README.md` provides a comprehensive overview of the frontend project, including setup instructions, project structure, and links to relevant documentation. Adjust the repository URL and other specific details as needed.
