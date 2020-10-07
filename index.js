const getMovies = require("./getMovies");
const fs = require("fs");

getMovies().then(movies => {
    // console.log(movies.length);
    for(var i = 0;i < movies.length;i ++){
        console.log(movies[i].name);
    }
})

getMovies().then(movies => {
    //电影数组转换成json字符串
    var json = JSON.stringify(movies);
    //没有文件会自行创建文件
    fs.writeFile("move.json",json,function(){
        console.log("成功");
    });
    
})


// async function test(){
//    const resp = await axios.get("https://movie.douban.com/chart");
//    const body = resp.data;
//    console.log(body);
// }

// test();