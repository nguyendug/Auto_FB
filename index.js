const puppeteer = require("puppeteer-core");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
const { scrollPageToTop } = require("puppeteer-autoscroll-down");
const assert = require("assert");
const hidemyacc = new (require("./hidemyacc"))();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const goto = async (
  page,
  url,
  options = { timeout: 60000, waitUntil: "networkidle0" }
) => {
  try {
    await page.goto(url, options);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

const waitForSelector = async (page, selector, options = { timeout: 3000 }) => {
  try {
    await page.waitForSelector(selector, options);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

!(async () => {
  try {
    const profileId = "64a77abcb1cb505a20ed0337";
    const proxy = {
      mode: "none",
      host: "pr.lunaproxy.com",
      port: 12233,
      username: "user-lu2769084-region-us",
      password: "Abcd!22345",
    };
    const success = await hidemyacc.start(profileId, {
      proxy: JSON.stringify(proxy),
    });

    console.log(success.data);
    //console.log(1);

    const browser = await puppeteer.connect({
      browserWSEndpoint: success.data.wsUrl,
      defaultViewport: null,
      slowMo: 60,
    });

    assert(browser);

    const page = await browser.newPage();
    assert(await goto(page, "https://m.facebook.com"));
    await delay(1000);

    // //Login tài khoản fb
    // // await page.type("#m_login_email", "0979362268");
    // await page.type('input[id="m_login_email"]', "nguyendung7501@gmail.com");
    // await delay(500);
    // // await page.type("#m_login_password", "0979362268");
    // await page.type('input[id="m_login_password"]', "maibennhaubannhe7501!");
    // await delay(500);

    // // await page.click('#login_password_step_element > button')
    // await page.click(
    //   'button[data-sigil="touchable login_button_block m_login_button"]'
    // );

    // await delay(5000);
    // const content = await page.content();
    // if (
    //   content.includes(
    //     "The password that you entered is incorrect, but we can help you get back in to your account."
    //   )
    // ) {
    //   console.log("sai pass roi");
    // }
    // await delay(10000);
    // // await waitForSelector(page, '')
    // // kiem tra cookie, url, selector xem login thanh cong hay chua?

    // await delay(5000);
    // const elementFr =
    //   'div[data-mcomponent="MContainer"] > div[role="button"] div[data-mcomponent="ServerTextArea"][data-type="text"] .fl.ac.am .native-text';
    // const clickIndexes = [4, 2, 5];

    // //Xem video, xem bạn bè, xem thông báo
    // await delay(10000);
    // const elementFr =
    //   'div[data-mcomponent="MContainer"] > div[role="button"] div[data-mcomponent="ServerTextArea"][data-type="text"] .fl.ac.am .native-text';
    // const clickIndexes = [4];

    // await page.waitForSelector(elementFr);
    // const elements = await page.$$(elementFr);
    // for await (const index of clickIndexes) {
    //   // for (const index of clickIndexes) {
    //   if (index < elements.length) {
    //     console.log("index", index);
    //     await delay(5000);
    //     try {
    //       elements[index].click();
    //       await delay(3000);
    //       const lastPosition1 = await scrollPageToBottom(page, {
    //         size: 500,
    //         delay: 1500,
    //       });

    //       await delay(3000);
    //       const lastPosition3 = await scrollPageToTop(page, {
    //         size: 500,
    //         delay: 1500,
    //       });
    //     } catch (error) {
    //       console.log("error", index, error);
    //     }
    //     await delay(5000);
    //     try {
    //       await page.goBack();
    //     } catch (error) {
    //       console.log("error goBack", index, error);
    //     }
    //     console.log("done", index);
    //   }
    // }
    // await page.waitForNavigation();
    // const lastPosition2 = await scrollPageToBottom(page, {
    //   size: 500,
    //   delay: 1500,
    // });

    //browser.close();

    // //Like bài viết
    // await delay(10000);
    // const elementLike =
    //   'div[data-mcomponent="MContainer"] > div[data-type="container"] > div[data-focusable="true"] > div[data-mcomponent="TextArea"] .native-text';
    // const clickLikes = [1];
    // await page.waitForSelector(elementLike);
    // const elementLikes = await page.$$(elementLike);

    // // elementsLikes[1].click();

    // for await (const index of clickLikes) {
    //   //for (const index of clickLikes) {
    //   if (index < elementLikes.length) {
    //     console.log("index", index);
    //     await delay(5000);
    //     try {
    //       elementLikes[index].click();
    //       await delay(3000);
    //       const lastPosition1 = await scrollPageToBottom(page, {
    //         size: 500,
    //         delay: 1500,
    //       });

    //       await delay(3000);
    //       const lastPosition3 = await scrollPageToTop(page, {
    //         size: 300,
    //         delay: 1500,
    //       });
    //     } catch (error) {
    //       console.log("error", index, error);
    //     }
    //     // await delay(5000);
    //     // try {
    //     //   await page.goBack();
    //     // } catch (error) {
    //     //   console.log("error goBack", index, error);
    //     // }
    //     console.log("done", index);
    //   }
    // }

    //Bình luận bài viết
    await delay(10000);
    const elementComment =
      'div[data-mcomponent="MContainer"] > div[data-type="container"] > div[data-focusable="true"] > div[data-mcomponent="TextArea"] .native-text';
    //const clickComments = [2];
    await page.waitForSelector(elementComment);
    const elementComments = await page.$$(elementComment);
    elementComments[2].click();
    await delay(5000);
    const eleComment =
      'div[id="screen-root"] > div[data-adjust-on-keyboard-shown="true"] > div[data-shift-on-keyboard-shown="true"] > div[data-mcomponent="MContainer"] textarea[type="text"]';
    //const clickComments = [2];
    await page.waitForSelector(eleComment);
    const eleComments = await page.$(eleComment);
    eleComments.click();
    await page.type(eleComment, ".");

    await delay(5000);
    const eleSend =
      'div[id="screen-root"] > div[data-adjust-on-keyboard-shown="true"] > div[data-shift-on-keyboard-shown="true"] > div[data-mcomponent="MContainer"] div:not(.hidden) > div > div[role="button"]';
    //const clickComments = [2];
    await page.waitForSelector(eleSend);
    const eleSends = await page.$(eleSend);
    eleSends.click();
    //await page.type(eleComment, ".");

    //Xem tin
  } catch (error) {
    console.log(error.message);
  }
})();
