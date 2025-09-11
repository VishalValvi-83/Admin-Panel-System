# Build stage: Use Java 17 JDK to compile and package
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Copy Maven wrapper and pom.xml first to cache dependencies
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Package the application, skipping tests for faster builds
RUN ./mvnw package -DskipTests

# Run stage: Use a lightweight JRE image to run the built JAR
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/admin-panel-0.0.1-SNAPSHOT.jar app.jar

# Expose the Spring Boot default port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
