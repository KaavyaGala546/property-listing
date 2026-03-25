# Contributing to Property Listing Platform

## ✍️ Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This leads to more readable messages that are easy to follow when looking through the project history.

### Commit Message Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Example

```text
feat(auth): add mock authentication bypass for development
```

## 🛠️ Engineering Standards

- **Linting**: Run `npm run lint` before committing.
- **Formatting**: Run `npm run format` to ensure consistent code style.
- **Testing**: Ensure all tests pass before submitting a pull request.
