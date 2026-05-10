# Contributing

## Pull Request Review Workflow

Before merging a pull request, keep the branch in a reviewable state:

- Run `yarn lint`.
- Run `yarn test --runInBand`.
- Run `yarn test:coverage` when the change affects logic, components, or store.
- Run `yarn build` before merging changes that affect production code or config.
- Keep generated artefacts such as `coverage/` and `dist/` out of commits.

## CodeRabbit Comments

CodeRabbit comments should be treated as review input, not automatic truth.
Each comment should be checked against the current code before making changes.

Recommended handling:

- Fix `critical` and `major` findings before merge when they are valid.
- Fix `minor` findings when the change is low risk or improves correctness.
- Treat `nitpick` findings as optional unless they simplify code or add useful
  test coverage.
- Skip comments that would introduce product changes outside the PR scope, but
  leave a short explanation in the PR.
- After fixing a thread, push a commit and mark the thread as resolved.

When asking Codex to handle CodeRabbit feedback, use:

```text
verifica os comentarios do CodeRabbit e corrige/responde
```

Codex should then:

1. Fetch PR comments and review threads.
2. Separate valid issues from noise.
3. Apply minimal fixes for valid comments.
4. Run the relevant validation commands.
5. Commit and push fixes to the PR branch.
6. Resolve addressed review threads.

## Commit Guidance

Prefer small commits with clear messages, for example:

```text
Address CodeRabbit review comments
Improve calculator service coverage
Document architecture decisions
```

Avoid mixing unrelated refactors with bug fixes unless the refactor is required
for the fix.
