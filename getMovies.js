const axios = require("axios");
const cheerio = require("cheerio");
/**
 * 得到所有电影的html字符串
 */
async function getMoviesHtml() {
    const resp = await axios.get("https://movie.douban.com/chart")
    return resp.data;
}

/**
 * 获取所有电影数据
 */
async function getMoviesData() {
    const html = await getMoviesHtml();
    const $ = cheerio.load(html);
    var trs = $("tr.item")
    var movies = [];
    for (let i = 0; i < trs.length; i++) {
        var tr = trs[i];
        //分析每个tr的数据，得到一部电影对象
        var m = getMovie($(tr));  //在jQuery里面dom对象转换为jQuery通过'$()'
        movies.push(m);
    }
    return movies;
}

/**
 * 分析tr，得到一部电影对象
 * @param {*} tr 
 */
function getMovie(tr) {
    var name = tr.find("div.pl2 a").text();
    name = name.replace(/\s/g, "");//去掉空白字符
    name = name.split("/")[0];  //电影名字

    var imgSrc = tr.find("a.nbg img").attr("src"); //电影图片
    var detail = tr.find("div.pl2 p.pl").text(); //电影详情
    return {
        name,
        imgSrc,
        detail
    }
}

module.exports = getMoviesData;



// async function test(){
//     const html = await getMoviesHtml();
//     console.log(html);
// }
// test();