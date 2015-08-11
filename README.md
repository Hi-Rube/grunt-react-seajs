##Intro
**grunt-react-seajs** is a plugin to translate component (eg.react component) to a seajs module.		

![](https://img.shields.io/npm/v/grunt-react-seajs.svg?style=flat)

##Usage
Use ```npm install grunt-react-seajs``` to install.        
		
Then add this line to your project's Gruntfile.js gruntfile:      

```
grunt.loadNpmTasks('grunt-react-seajs');
```			

**grunt-react-seajs** has a independent config file. 		
You can change the ***config_file*** item in options to designated config file.	    

##Configuration Example
```
grunt.initConfig({
  react_seajs: {
    default_options: {
      config_file: "./grs_config.json"
    }
  }
});
```    

The independent config file example:     
 
```
{
  "merge": [
    {
      "file": [
        "./test/components/*A.js",
        "./test/components/componentB.js"
      ],
      "target": "./test/build/build.js"
    }
  ],
  "single": [
    {
      "target": "./test/build/",
      "file": ["./test/components/*C.js"]
    }
  ]
}
```

```merge``` is a array include files you want to merge     
```single``` is a array include files you just want to translate and move 

feature I will create more options to choose.
