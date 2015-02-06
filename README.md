# react-table-component
A reusable React component for viewing tabular data with simple sorting.

##How to Use##

You'll need to have a simple web server running. If you're on a Mac with Python, `cd` to this directory and run:

    python -m SimpleHTTPServer

Then open your favorite browser and go to:

    http://localhost:8000/

The component takes an input of JSON formatted data file:

    React.render(<TableComponent src="./data/data.json" />, mountNode)

where `data.json` consists of similarly structured objects. Something like:

    {
      "name": "Emily Donovan",
      "address": "Ap #677-3529 Morbi Rd.",
      "city": "Whitby",
      "region": "ON",
      "country": "Canada",
      "birthday": "1998-08-26"
    }

The result is a table with headers for `name`, `address`, `city`, `region`, `country` and `birthday`.

Clicking a header will sort the table by that column in ascending order. Clicking the header again will sort the table by that column in descending order.

Your data objects can have as many properties as desired as long as all objects in the data file have the same properties. The order of the properties in each object can vary, though the headers will take their order from the first object in the data file.
