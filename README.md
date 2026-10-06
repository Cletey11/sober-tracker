# Sober Streak Leaderboard

Netlify-ready six-person leaderboard.

Preloaded members:
- Jesk
- Data
- Voss
- Tone
- Cletey
- Buster

There are no accounts in this version. Anyone with the URL can add sober days to a member.

## Deploy
1. Put these files in a GitHub repository.
2. In Netlify choose Add new project -> Import an existing project.
3. Select the GitHub repository.
4. Enable/connect Netlify Database when prompted.
5. Deploy.

The SQL migration automatically creates the table and inserts the six names.

## Local
npm install
npx netlify dev

For a group of six this is intentionally simple. If you later want only each person to edit their own total, authentication can be added.
