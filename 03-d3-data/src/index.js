import * as d3 from 'd3';
import { json } from 'd3';

d3.select("body").append("div").attr("class","container");
d3.select(".container").append("strong").text("Nombre de posts par utilisateur : ");


let post_filtered;
let maxBodyLength=0;
let userIdMaxBodyLength;
let tab=[];
let i=0;


Promise.all([
  json('https://jsonplaceholder.typicode.com/posts'),
  json('https://jsonplaceholder.typicode.com/users')
])
.then(([posts, users]) =>  {


    users.forEach(usr => {
      post_filtered = posts.filter(post=>post.userId === usr.id)
      d3.select(".container").append("p").text(usr.name+" : "+post_filtered.length+" posts");
    })



    posts.forEach(post_index => {
   
    if (post_index.body.length>maxBodyLength) {
      maxBodyLength = post_index.body.length;
      userIdMaxBodyLength = post_index.userId;
    }
      
    })
    d3.select(".container").append("strong").text("Plus long post : "); 
    d3.select(".container").append("p").text(users[userIdMaxBodyLength].name+", avec un post d'une longueur de "+maxBodyLength+" caractères");

    //Dessiner avec les données 

    const WIDTH = 500
    const HEIGHT = 500

    d3.select("body").append("div").attr("class","mon-svg");
    d3.select(".mon-svg").append("svg");
    const myDiv2 = d3.select("svg").attr("width", WIDTH).attr("height", HEIGHT)
  
    
    users.forEach(usr => {
      post_filtered = posts.filter(post=>post.userId === usr.id)
      tab[i]= post_filtered.length;
      i++;
    })

  
    const widthRect = 30;
    myDiv2.selectAll("rect")
      .data(tab)
      .enter()
      .append("rect")
      .attr('x', (d,i) => (i*40+50))
      .attr('y', d => 300-d*10)
      .attr('width', widthRect)
      .attr('height', d => d*10)
      .attr('stroke', 'black')
      .attr('fill', '#69a3b2');

      //https://jsfiddle.net/xfksm08b/10/
      var texts = myDiv2.selectAll("text")
	      .data(tab)
	      .enter()
	      .append("text");

      texts
      .attr('x', (d,i) => (i*40+55))
      .attr('y', d => 300+20)
	    .text(function(d){ return d});

});

