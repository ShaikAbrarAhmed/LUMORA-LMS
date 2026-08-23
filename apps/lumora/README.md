# Lumora LMS Frappe App

Lumora LMS is a Learning Management System built on the Frappe Framework.

This package contains the core Lumora backend application, including DocTypes, APIs, services, jobs, and configuration.

## Backend Testing

Set your local Lumora site as the current Bench site once:

    bench use <your-lumora-site>

Then run the complete Lumora backend test suite with one command:

    bench run-tests --app lumora

The command runs all backend tests registered for the Lumora app. Each backend developer should use their own local Lumora site so the test suite can run independently.

### Coverage

Coverage can be generated locally with:

    bench run-tests --app lumora --coverage

The Week 11 CI plan will run the same full backend test command and publish the resulting coverage report as a CI artifact. Coverage thresholds will be defined when CI coverage enforcement is introduced.
