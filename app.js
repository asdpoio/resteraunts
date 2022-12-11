const express = require('express');
const exphbs = require('express-handlebars');
const restaurantList = require('./restaurants.json');
const app = express();
const port = 3000;

//express template engine 模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//靜態檔案
//所有從路由器進來的請求都先走這一道關卡
app.use(express.static('public'))

// router 1 首頁
app.get("/", (req, res) => {
  const restaurants = restaurantList.results;

  res.render("index", { restaurants });
});

// router 2 個別顯示頁面
app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (rest) => rest.id.toString() === req.params.id
  );

  res.render("show", { restaurant });
});

// router 3 搜尋結果
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim();

  /// 搜尋當前餐廳是否符合中名或英名或類別，符合其中一項就加入搜尋結果陣列
  const restaurants = restaurantList.results.filter((rest) => {
    const keywordLow = keyword.toLowerCase();
    return (
      rest.name.toLowerCase().includes(keywordLow) ||
      rest.name_en.toLowerCase().includes(keywordLow) ||
      rest.category.toLowerCase().includes(keywordLow)
    );
  });

  res.render("index", { restaurants, keyword });
});
// --- 監聽伺服器 --- //
app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})
