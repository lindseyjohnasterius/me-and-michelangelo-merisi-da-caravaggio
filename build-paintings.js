const fs = require('fs');
const matter = require('gray-matter');
const parser = require('@deskeen/markdown')


// directory path
const dir = `${__dirname}/assets/paintings/`;

let PAINTINGS = ''

// list all files in the directory
fs.readdir(dir, async (err, files) => {
  if (err) {
      throw err;
  }

  files.forEach(async file => {
    const yaml = matter.read(`${dir}/${file}`);
    const data = yaml.data

    const html_code = parser.parse(yaml.content).innerHTML;


    PAINTINGS += `
      <map-location
        latitude=${data.coordinates[1]}
        longitude=${data.coordinates[0]}
        zoom=18
        bearing=15
        pitch=30
        id=${data.id}

      >
        <map-marker>
          <wikipedia-image src=${data.wikipedia}></wikipedia-image>
        </map-marker>
        <h1>${data.title}</h1>
        <h2>${data.year}</h2>
        <article class="content">
          ${html_code}
        </article>

        <wikipedia-entry src=${data.wikipedia}></wikipedia-entry>

      </map-location>
    `
  })

  fs.writeFile('paintings.html', PAINTINGS, function(err){
    if(err){
      console.log(err)
    }
  })

});

