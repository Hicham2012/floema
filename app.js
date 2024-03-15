require("dotenv").config()

const express = require("express")
const app = express()
const path = require("path")
const port = 3000

const Prismic = require("@prismicio/client")
const PrismicDOM = require("prismic-dom")

const initApi = req => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req

  })

}

const handleLinkResolver = () => {
  return '/'
}

app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: handleLinkResolver
  }

  res.locals.PrismicDOM = PrismicDOM

  next()
})

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.get('/', (req, res) => {
  res.render("pages/home")
})

app.get("/about", (req, res) => {
  initApi(req).then(api => {
    api.query(Prismic.Predicates.any("document.type", ["metadata", "about"])).then(response => {
      const { results } = response
      const [ metadata, about ] = results

      // console.log(metadata, about)

      res.render("pages/about", {
        about,
        metadata
      })
    })
  })

})

app.get("/collection", (req, res) => {
  res.render("pages/collection")
})

app.get("detail/:uid", (req, res) => {
  res.render("pages/detail")
})

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})
