---
description: Index a local codebase into a CSV for Mantis, optionally creating and activating a Mantis codebase map. Use when the user wants Claude Code to map a repository or create a codebase CSV.
argument-hint: [repo-path]
allowed-tools: Bash, AskUserQuestion
disable-model-invocation: true
---

# Create Codebase CSV

Use `mantis create codebase`. This command is local-first: it scans files on the user's machine and writes a CSV. It can optionally continue into `mantis create map`.

## CSV-only Flow

1. Get the repo root from `$ARGUMENTS` or ask the user.
2. Run:

```bash
mantis create codebase "./repo" --out "./repo-codebase.csv"
```

3. Explain the CSV columns:
   - `path`: repo-relative file path
   - `file_name`
   - `extension`
   - `language`
   - `kind`: rough file role such as component, route, api, utility, test, source
   - `loc`
   - `bytes`
   - `imports`
   - `summary`
   - `content`

## Full Demo Flow

If the user wants the codebase to become a Mantis map immediately, run:

```bash
mantis create codebase "./repo" \
  --create-map \
  --space-mode new \
  --space-name "Codebase: Repo Name" \
  --private \
  --map-name "Source Code Index" \
  --activate \
  --thread-name "Architecture Review"
```

The command uses good defaults for codebase maps:

- `title`: `path`
- `semantic`: `summary,content,imports`
- `categoric`: `language,kind,extension`
- `numeric`: `loc,bytes`

## After Activation

If `--activate` was used, tell the user to run:

```text
/reload-plugins
```

Then suggest prompts like:

```text
What are the main architectural zones in this codebase?
Which files are central or risky?
Where should I start if I want to refactor the map rendering system?
```

## Notes

- Use `mantis setup` first if API configuration is missing.
- Avoid scanning dependency/build folders manually; the CLI already ignores common junk like `.git`, `node_modules`, `.next`, `dist`, `build`, and caches.
- For agent-driven demos, pass flags explicitly instead of relying on interactive prompts.
