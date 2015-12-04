## What is it?

bootstrapTagger is a jQuery plugin for simply turning an input element into a Bootstrap styled tag editing control for use with blogs and various other web based software.

## What does it look like?

Here is a live Demo: [http://mrvautin.github.io/bootstrapTagger.html](http://mrvautin.github.io/bootstrapTagger.html)

*Note: Tags are comma seporated. Once a comma is pressed a new tag is created*

    <input type="text" name="input_tags" id="input_tags" value="this,is,a,tag">

## Stop. Where can I get it?

The Javascript and CSS can be downloaded [here](https://github.com/mrvautin/bootstrapTagger/archive/master.zip)

## How does it work? - Basic example

You need to add the following to your <head> tag:

    <link rel="stylesheet" href="css/bootstrapTagger.css">
    <script src="js/bootstrapTagger.js"></script>

Create a HTML input field to hold the tags:

*Note: You can set a value with pre-set comma seporated tags*

    <input type="text" name="input_tags" id="input_tags" value="this,is,a,tag">

You can then setup the input element:

    $("#input_tags").bootstrapTagger({backgroundColor: "primary"});
    
## Options

There aren't many right now...

**Option**

    $("#input_tags").bootstrapTagger({backgroundColor: "primary"});

**Description**

Any of the standard Bootstrap colors are supported.

* default
* primary
* success
* info
* warning
* danger

Eg: Using the "success" (green) color would be:

    $("#input_tags").bootstrapTagger({backgroundColor: "primary"});
    
Alternatively a value of "random" can be used to randomly select a color for each tag. Eg:

    $("#input_tags").bootstrapTagger({backgroundColor: "random"});