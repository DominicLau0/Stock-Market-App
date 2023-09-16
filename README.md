# Stock Market App
## Description
This app is a stock market app where you can search for stocks on the stock market and track its real time price.
You can do many other things such as look up the news related to the specific stock, track its price history of 1 day, 1 week, 1 month, 6 months, and 1 year, and even bookmark the stock to the homepage for easy access.

## Demo
Here's a small demonstration of what you can do in this app.

https://github.com/DominicLau0/Stock-Market-App/assets/129682941/abaf610b-7ce6-457b-b700-78df1edeafb1

## Home
This is your homepage. Here you can quickly navigate to your bookmarked stocks or explore news related to the stock market. Clicking on the news will redirect you to the website in app.

<img src="https://github.com/DominicLau0/Stock-Market-App/assets/129682941/d0a169d9-0338-4c9d-bcd3-f7db714ec363" width="250">


## Search
You can search for stocks on the stock market by typing either the stock symbol or the company name.

<img src="https://github.com/DominicLau0/Stock-Market-App/assets/129682941/2cc43581-47a2-4399-a2cb-de42318a6f45" width="250">

## Stock Details
In this page, you can look at the real time stock price, as well as the price history of 1 day, 1 week, 1 month, 6 months, or 1 year.

You can also navigate the crosshair with your figures to look at more specific details of the graph, such as the open price, close price, high, low, and date.

On the upper right hand corner, there's a plus button that you can click on to bookmark the stock. If you've already bookmarked the stock, it should display a checkmark button that you can click again to unbookmark the stock.

<img src="https://github.com/DominicLau0/Stock-Market-App/assets/129682941/01d992cb-ce45-4807-ad70-3fc14c184d57" width="250">

### News

There's also a section on the bottom of the page that displays all the relevant news about the stock.

Clicking on the news will redirect you to the website in app.

<img src="https://github.com/DominicLau0/Stock-Market-App/assets/129682941/78c0d696-d625-4144-adc2-4a8ce0a3f2fa" width="250">

<img src="https://github.com/DominicLau0/Stock-Market-App/assets/129682941/a3610a84-a2d6-47a1-9f0e-d128a72d11b8" width="250">

## Installation Guide
You can test this app by downloading this file and typing `npm install`. This will download all the relevant files and libraries needed to run this app.

Next you can type `npx expo start` or `npx expo start --tunnel` to start the Metro Bundler.
Make sure that the phone you're using has the same WIFI connection as your computer. You have to set your network to private if you want to use `npx expo start`. If you don't want to do that, you can just type `npx expo start --tunnel` and it should work.

Once the Metro Bundler starts, you can now download `Expo` from the App Store or the Google Play Store. This will allow you to run the app on your phone.

Afterwards, you can go to your camera app and scan the QR code shown on the terminal screen on your computer. Once you've clicked on the link, it should redirect you to the Expo app where it should start the development of the app.
From there you can test all kinds of features on this app.

The private API key where I pull all the stock market data is publicly available in the files to make the installation easier,
but if someone steals it and use the API key constantly outside this app, then this app might not work correctly as there's a 60 API call/minute limit.
