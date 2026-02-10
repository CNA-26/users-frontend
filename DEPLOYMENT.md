# Rahti CSC Deployment Guide

## Prerequisites
- GitHub repository with the code
- Access to Rahti CSC (https://rahti.csc.fi/)
- OpenShift CLI (`oc`) installed (optional, for command-line deployment)

## Deployment Files Created
- **Dockerfile**: Multi-stage build (Node.js → nginx)
- **nginx.conf**: Nginx configuration for React Router SPA

## Deployment Steps

### Option 1: Deploy via Rahti Web Console (Recommended)

1. **Login to Rahti**
   - Go to https://rahti.csc.fi/
   - Login with your CSC credentials

2. **Create New Project** (if needed)
   - Click "Create Project"
   - Enter project name (e.g., `users-frontend`)

3. **Deploy from GitHub**
   - Click "+ Add" → "Import from Git"
   - Enter your GitHub repository URL: `https://github.com/CNA-26/users-frontend.git`
   - Rahti will auto-detect the Dockerfile

4. **Configure Build**
   - Application Name: `users-frontend`
   - Name: `users-frontend`
   - Click "Create"

5. **Wait for Build**
   - Rahti will clone the repo, build the Docker image, and deploy
   - Monitor build logs in the console

6. **Access Your App**
   - Once deployed, click on "Routes" to get your app URL
   - Example: `https://users-frontend-<project>.rahtiapp.fi`

### Option 2: Deploy via OpenShift CLI

```bash
# Login to Rahti
oc login https://api.2.rahti.csc.fi:6443

# Create new project
oc new-project users-frontend

# Create app from GitHub
oc new-app https://github.com/CNA-26/users-frontend.git --name=users-frontend

# Expose the service
oc expose svc/users-frontend

# Get the route URL
oc get route users-frontend
```

## Troubleshooting

### 404 Errors on Routes
- **Cause**: nginx not configured for SPA routing
- **Solution**: Ensure `nginx.conf` is present and properly configured (already done)

### Build Failures
- **Check build logs**: In Rahti console → Builds → View logs
- **Common issues**:
  - Missing dependencies: Run `npm install` locally first
  - Build timeout: Increase build timeout in Rahti settings

### Port Issues
- **Rahti requires port 8080**: Dockerfile and nginx.conf already configured for this

## Environment Variables (Future)
When you connect to the real backend, add environment variables in Rahti:
- `REACT_APP_USERS_API_URL`: Your backend API URL
- `REACT_APP_USE_MOCK`: Set to `false` for production

## Next Steps
1. Commit and push `Dockerfile` and `nginx.conf` to GitHub
2. Deploy to Rahti using one of the methods above
3. Test all routes work correctly
