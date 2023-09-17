import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
import Constants from 'expo-constants';

var apiKey = Constants.expoConfig.extra.azureApiKey;

const client = new DocumentAnalysisClient("https://splitit-receipt-ocr.cognitiveservices.azure.com/", new AzureKeyCredential(apiKey));

export { client }