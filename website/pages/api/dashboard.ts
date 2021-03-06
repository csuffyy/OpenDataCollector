// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getApiUrl } from "../../helpers/common_helper"

export default async (req, res) => {
  const url = `${getApiUrl(req.query['serviceName'])}/api/dashboard`;
  const reqData = await fetch(url)
  const resData = await reqData.json()
  for (const item of resData.items) {
    switch (item['name']) {
      case '資料集':
      case '資料':
        item['route'] = `dataset?queryUrl=${item['url']}`
        break;
      case '組織':
      case '機關':
        item['route'] = 'category/org'
        break;
      case '主題':
      case '群組':
      case '服務分類':
        item['route'] = 'category/group'
        break;
      default:
        item['route'] = ''
        break;
    }
  }

  res.status(200).json(resData)
}
