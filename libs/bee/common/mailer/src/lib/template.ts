import { TCvProposalEntity } from '@bee/common/types';

export const template = (
  {
    entreprise_name,
    employee_name,
    entreprise_logo,
    entreprise_adresse,
    diplome_name,
    university_name,
    found_in,
    project_type,
    entreprise_market_value,
  }: Partial<TCvProposalEntity>,
  date?: string,
) => `<!DOCTYPE html>

<html
  lang="en"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings></xml
    ><![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      @media (max-width: 660px) {
        .desktop_hide table.icons-inner,
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }

        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .mobile_hide {
          display: none;
        }

        .row-content {
          width: 100% !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }

        .row-4 .column-2 .block-1.paragraph_block td.pad > div,
        .row-4 .column-2 .block-2.paragraph_block td.pad > div {
          text-align: center !important;
        }

        .row-4 .column-2 .block-1.paragraph_block td.pad {
          padding: 0 0 5px 30px !important;
        }

        .row-4 .column-1 .block-2.social_block td.pad {
          padding: 10px 10px 5px !important;
        }
      }
    </style>
    <!--[if true
      ]><style>
        .forceBgColor {
          background-color: white !important;
        }
      </style><!
    [endif]-->
  </head>
  <body
    class="forceBgColor"
    style="
      background-color: transparent;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: transparent;
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-1"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f0f3f8;
                        border-radius: 0;
                        color: #000;
                        width: 640px;
                        margin: 0 auto;
                      "
                      width="640"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="heading_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <h3
                                    style="
                                      margin: 0;
                                      color: #030303;
                                      direction: ltr;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      font-size: 24px;
                                      font-weight: 700;
                                      letter-spacing: normal;
                                      line-height: 120%;
                                      text-align: center;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                    "
                                  >
                                    <strong
                                      >Candidature pour le poste de développeur
                                      Junior chez ${entreprise_name}
                                    </strong>
                                  </h3>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-2"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-radius: 0;
                        color: #000;
                        width: 640px;
                        margin: 0 auto;
                      "
                      width="640"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="50%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #101112;
                                      direction: ltr;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 12px">
                                      Mohamed Birali
                                    </p>
                                    <p style="margin: 0; margin-bottom: 12px">
                                      Khénifra, Béni-Mellal, Maroc.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 12px">
                                      mohamed.birali@outlook.com
                                    </p>
                                    <p style="margin: 0; margin-bottom: 12px">
                                      +212 708 013 461
                                    </p>
                                    <p style="margin: 0">${date}</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-2"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="50%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #101112;
                                      direction: ltr;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 12px">
                                      ${employee_name ?? ''}
                                    </p>
                                    <p style="margin: 0; margin-bottom: 12px">
                                      ${entreprise_name},
                                    </p>
                                    <p style="margin: 0; margin-bottom: 12px">
                                      ${entreprise_adresse ?? ''}.
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-3"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #f0f3f8;
                        border-radius: 0;
                        color: #000;
                        width: 640px;
                        margin: 0 auto;
                      "
                      width="640"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 30px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #101112;
                                      direction: ltr;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Madame, Monsieur,
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Je me permets de vous écrire pour exprimer
                                      mon vif intérêt pour le poste de
                                      Développeur Junior chez ${
                                        entreprise_name ?? 'vous'
                                      },
                                      tel que publié sur ${found_in}. Fort d'une
                                      base solide en programmation, d'une
                                      passion pour la résolution de problèmes et
                                      d'un engagement envers l'apprentissage
                                      continu, je suis convaincu de ma capacité
                                      à apporter une contribution significative
                                      à votre équipe dynamique.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      <strong>Résumé Professionnel :</strong> Je
                                      viens de terminer mes études en
                                      ${diplome_name} à la ${university_name}, où
                                      j'ai acquis une compréhension approfondie
                                      des principes du développement logiciel et
                                      acquis une expérience pratique dans divers
                                      langages de programmation, notamment
                                      Javascript, Java et SQL. Mon parcours
                                      académique, associé à des stages et des
                                      projets personnels, m'a doté des
                                      compétences et des connaissances
                                      nécessaires pour prospérer dans un
                                      environnement de développement
                                      professionnel.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      <strong>Compétences Clés :</strong>
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Maîtrise des langages de programmation
                                      tels que Javascript, TypeScript.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Compréhension de la programmation orienté
                                      objet (POO).
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Compréhension et gestion de base de
                                      données.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Familiarité avec Angular, NestJs, VsCode,
                                      Git, Dbeaver ...
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Compétences en résolution de problèmes.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Capacités de communication et de
                                      collaboration.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Engagement envers la rédaction de code
                                      propre et maintenable.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      <strong>Expérience Pertinente :</strong>
                                      Au cours de mon dernier stage chez
                                      E-Ambition, j'ai collaboré avec succès
                                      avec une équipe pluridisciplinaire pour
                                      développer ${project_type}, démontrant
                                      ainsi ma capacité à travailler
                                      efficacement dans un environnement
                                      collaboratif. Je suis compétent pour
                                      identifier et résoudre des problèmes,
                                      ainsi que pour mettre en œuvre des
                                      solutions efficaces et maintenables.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      <strong
                                        >Passion pour l'Apprentissage :</strong
                                      >
                                      Je suis enthousiaste à l'idée de rester à
                                      jour avec les tendances de l'industrie et
                                      les technologies émergentes.
                                    </p>
                                    ${entreprise_market_value}
                                    <p style="margin: 0; margin-bottom: 15px">
                                      <strong>Conclusion :</strong> Je suis
                                      convaincu que mes compétences techniques,
                                      associées à ma passion pour
                                      l'apprentissage continu et mon engagement
                                      envers l'excellence, font de moi un
                                      candidat solide pour le poste de
                                      Développeur Junior chez ${entreprise_name}.
                                      Je me réjouis de l'opportunité de discuter
                                      de la manière dont mes compétences
                                      correspondent à vos besoins et de
                                      contribuer au succès de votre équipe.
                                    </p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Je vous remercie de prendre en
                                      considération ma candidature. Je suis
                                      impatient de discuter plus en détail de
                                      mes qualifications lors d'un entretien.
                                    </p>
                                    <p style="margin: 0">Mohamed Birali,</p>
                                    <p style="margin: 0; margin-bottom: 15px">
                                      Cordialement.
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-4"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-size: auto;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-size: auto;
                        background-color: #0068a5;
                        color: #000;
                        width: 640px;
                        margin: 0 auto;
                      "
                      width="640"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 20px;
                              padding-top: 20px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="33.333333333333336%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="image_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad" style="width: 100%">
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                    <img
                                      alt="I'm an image"
                                      src="https://firebasestorage.googleapis.com/v0/b/organisation-chat.appspot.com/o/me.png?alt=media&token=ab17722f-8f4b-48d4-97be-c568fd3ce561"
                                      style="
                                        display: block;
                                        height: auto;
                                        border: 0;
                                        max-width: 161px;
                                        width: 100%;
                                      "
                                      title="Personal photo: B.Birali"
                                      width="161"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="social_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div align="center" class="alignment">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="social-table"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-block;
                                      "
                                      width="184px"
                                    >
                                      <tr>
                                        <td style="padding: 0 7px 0 7px">
                                          <a href="https://www.linkedin.com/in/mohamed-birali"
                                            ><img
                                              alt="Linkedin"
                                              height="32"
                                              src="https://firebasestorage.googleapis.com/v0/b/organisation-chat.appspot.com/o/linkedin2x.png?alt=media&token=30d943c3-c7bb-4634-965e-ce4338901d8b"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 1px darkcyan #ffffff;
                                              "
                                              title="linkedin"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td style="padding: 0 7px 0 7px">
                                          <a href=" https://wa.me/212708013461"
                                            ><img
                                              alt="WhatsApp"
                                              height="32"
                                              src="https://firebasestorage.googleapis.com/v0/b/organisation-chat.appspot.com/o/whatsapp2x.png?alt=media&token=56d91f96-1757-4717-9b71-150d52bda88e"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="WhatsApp"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td style="padding: 0 7px 0 7px">
                                          <a
                                            href="mailto:mohamed.birali@outlook.com"
                                            ><img
                                              alt="E-Mail"
                                              height="32"
                                              src="https://firebasestorage.googleapis.com/v0/b/organisation-chat.appspot.com/o/mail2x.png?alt=media&token=b602c05c-0ac2-4e9a-91bc-679d805ef097"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="E-Mail"
                                              width="32"
                                          /></a>
                                        </td>
                                        <td style="padding: 0 7px 0 7px">
                                          <a href="https://mohamedbirali.online/"
                                            ><img
                                              alt="Web Site"
                                              height="32"
                                              src="https://firebasestorage.googleapis.com/v0/b/organisation-chat.appspot.com/o/website2x.png?alt=media&token=c815052d-fac4-4917-8ce2-4b84686731a4"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                              title="Web Site"
                                              width="32"
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-2"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="66.66666666666667%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 5px;
                                    padding-left: 30px;
                                    padding-top: 35px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #555555;
                                      font-family: 'Montserrat', 'Trebuchet MS',
                                        'Lucida Grande', 'Lucida Sans Unicode',
                                        'Lucida Sans', Tahoma, sans-serif;
                                      font-size: 34px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 40.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span style="color: #ffffff"
                                        >Mohamed Birali</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="paragraph_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad" style="padding-left: 30px">
                                  <div
                                    style="
                                      color: #555555;
                                      font-family: 'Montserrat', 'Trebuchet MS',
                                        'Lucida Grande', 'Lucida Sans Unicode',
                                        'Lucida Sans', Tahoma, sans-serif;
                                      font-size: 14px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 16.8px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span style="color: #ffffff"
                                        >Full stack developer</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="paragraph_block block-3"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 20px;
                                    padding-left: 30px;
                                    padding-right: 30px;
                                    padding-top: 20px;
                                  "
                                >
                                  <div
                                    style="
                                      color: #555555;
                                      font-family: 'Montserrat', 'Trebuchet MS',
                                        'Lucida Grande', 'Lucida Sans Unicode',
                                        'Lucida Sans', Tahoma, sans-serif;
                                      font-size: 16px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p
                                      style="margin: 0; word-break: break-word"
                                    >
                                      <span style="color: #ffffff"
                                        >👋 Hi i'm a full stack developer.
                                        💻 Coding isn't just a career choice for me, i find joy in crafting elegant solutions to complex challenges, and I'm always eager to learn and grow. 👨‍💻 Collaboration with experienced developers is a source of inspiration for me, and I'm committed to contribute my skills and ideas to make projects successful.</span
                                      >
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>
</html>
`;
export async function isEntrepriseValue(
  entreprise_name?: string,
  entreprise_market_value?: string,
): Promise<string> {
  return entreprise_market_value
    ? `
  <p style="margin: 0; margin-bottom: 15px">
    <strong
      > ${entreprise_name}:</strong
    >
    Je suis particulièrement attiré par
    ${entreprise_name} en raison de sa
    réputation pour l'innovation et de son
    engagement envers
    ${entreprise_market_value}. Je suis
    enthousiaste à l'idée de contribuer à
    votre équipe et de progresser en tant que
    développeur.
  </p>
  `
    : '';
}
