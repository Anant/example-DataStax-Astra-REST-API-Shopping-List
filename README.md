This repo contains a template and a completed (***non-refactored***) version of a ***very*** basic shopping list app with **no CSS**, which uses DataStax Astra's REST API in order to do CRUD operations. This repo is strictly for demonstration purposes and may be refactored in the future to be more simplified. However for the time being, it works for our purposes in order to demonstrate DataStax Astra's REST API. 

## Getting Started

1. Create your DataStax Astra Account / Database
2. Download this [notebook](https://drive.google.com/file/d/1BR19vqH6OcWo5V5F7zSfnegXmGP0yHy8/view?usp=sharing)
3. Drag-and-drop the downloaded notebook into DataStax Astra's Studio
4. Run Cells 1-3, making sure the correct keyspace is selected
5. Copy the REST API URL from the Connect page of your Astra Database
6. Run `mv example.env .env`
7. Insert credentials, REST API URL, keyspace name, and table name into the `.env` file
8. Run `npm i`
9. Run `npm start`

## Additional Resources

- [Webinar](): We live demo this process and write the shopping list app using the template directory
- [Accompanying Blog]()
- [Accompanying Slideshare]()
