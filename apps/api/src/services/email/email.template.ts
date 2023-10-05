import config from 'config';

export const EmailTemplate = (id: string) => {
  return `
<div style="color: grey; text-align: center;">
  <table style="width: 500px; color: #ffffff; border-radius: 10px; text-align: center; margin: 0 auto;">
    <tr>
      <td>
        <img style="border-radius: 10px" src="https://img.artlebedev.ru/everything_files/images/4384/paralect-1200.png" />
      </td>
    </tr>
    <tr>
      <td>
        <h1 style="text-align: center; color: black">Welcome to the world of test tasks!</h1>
      </td>
    </tr>
    <tr>
      <td>
        <h2 style="text-align: center; color: black;">Click the button below to confirm your account:</h2>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; cursor: pointer;">
      <a href="http://194.169.160.148/api/account/verify-email?token=${id}" target="_blank">
          <button style="text-decoration: none!important; color: #ffffff; font-size: 20px; padding: 10px 30px; display: inline-block; background: #2b77eb; border-radius: 5px; font-family: arial, 'helvetica neue', helvetica, sans-serif; font-weight: normal; font-style: normal; line-height: 24px!important; width: auto; text-align: center; letter-spacing: 0; border: none; cursor: pointer;">verify account</button>
        </a>
      </td>
    </tr>
  </table>
</div>
`;
};
