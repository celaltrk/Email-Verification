#!/bin/bash

API_HOST="http://localhost:3000"

# Test Unregistered User 
echo -e "** TEST API 3 (Not Found)**"
curl -X POST "${API_HOST}/user/check-verification/test_user"

# Test User Registration - Successful
echo -e "\n\n** TEST API 1 (true) **"
curl -X POST "${API_HOST}/user/register" -H "Content-Type: application/json" -d '{ "username": "test_user", "email": "celalsalih64@gmail.com"}'

# Test User Registration - Duplicate Username
echo -e "\n\n** TEST API 1 (Bad Request) **"
curl -X POST "${API_HOST}/user/register" -H "Content-Type: application/json" -d '{ "username": "test_user", "email": "example@gmail.com"}'

# Test User Registration - Duplicate Email
echo -e "\n\n** TEST API 1 (Bad Request) **"
curl -X POST "${API_HOST}/user/register" -H "Content-Type: application/json" -d '{ "username": "example", "email": "celalsalih64@gmail.com"}'

# Test Email Verification - Before Verification
echo -e "\n\n** TEST API 3 (User is not verified) **"
curl "${API_HOST}/user/check-verification/test_user"

# Test Verifying Email
echo -e "\n\n** TEST API 2 (Now, check your email and click the link. Press Enter after verifying.) **"

read _

# Test Email Verification - Successful
echo -e "\n** TEST API 3 (User is verified) **"
curl "${API_HOST}/user/check-verification/test_user"
echo -e "\n\n"