This KaiOS app offer an AI assistant that works on any KaiOS phone. Tested on KaiOS 2.5 (supplied with 2.5 manifest).
This app provides an easy to use lighweight interface to an an AI engine hosted on GCP via a cloud function. Follow the steps below from Rominirani (github) to set up a Google Palm 1 API.
The app is not ready to use and requires the URL to your own AI API as you cannot use openAI API. It does not work with KaiOS due to a number of limitation.
The steps below allows you to build a bespoke API whch will accept POST request from a KaiOS device. If you would like to collaborate on building on of the shelf version of this app, contact me.

1. Enable Billing and APIs:

Ensure your Google Cloud Project has billing enabled.
In Google Cloud Shell, enable these APIs:
Bash
gcloud services enable cloudbuild.googleapis.com cloudfunctions.googleapis.com run.googleapis.com logging.googleapis.com storage-component.googleapis.com aiplatform.googleapis.com
Use code with caution.
2. Clone Repository:

Clone the repository containing main.py and requirements.txt from: https://github.com/rominirani/genai-apptemplates-googlecloud/tree/main/text-predict-cloudfunction
3. Set Environment Variables:

In Cloud Shell, set these environment variables:
GCP_PROJECT: Your Google Cloud Project ID.
GCP_REGION: The region for deployment (e.g., us-central1).
Bash
export GCP_PROJECT='<Your GCP Project Id>'
export GCP_REGION='us-central1'

4. Deploy the Cloud Function:

Navigate to the project's root folder (containing main.py and requirements.txt).
Run the following command to deploy the Cloud Function named predictText:

gcloud functions deploy predictText \
--gen2 \
--runtime=python311 \
--region=$GCP_REGION \
--source=. \
--entry-point=predictText \
--trigger-http \
--set-env-vars=GCP_PROJECT=$GCP_PROJECT,GCP_REGION=$GCP_REGION \
--allow-unauthenticated

5. Get the Cloud Function URL:

In the Cloud Run dashboard, find the newly created service and copy its URL path.
6. Update AIengine Javascript Function:

Paste the copied URL into the designated space in the index.js file of your AIengine Javascript function.
