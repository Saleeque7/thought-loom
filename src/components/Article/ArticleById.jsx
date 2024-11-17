import { useEffect, useState } from "react";
import { dateFormatter, getInitials, stringToColor } from "../../helpers/Helper";
import { useParams } from "react-router-dom";
import { userAxiosInstance } from "../../utils/api/Interceptors";
import { getArticlesApi } from "../../utils/api/api";

export default function ArticleById() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "The Future of Tech Innovations",
      overview: `Exploring the latest advancements in AI, VR, and blockchain technology.Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, fugit natus fuga nobis quas id tempora nulla debitis dolores numquam, accusantium repellendus adipisci cum atque libero praesentium magnam. Illo, eaque
      Pariatur quo ullam quidem,   Odio dolore, nemo rem incidunt praesentium reiciendis harum dolorem quibusdam molestiae ut mollitia! Tempore quibusdam eum vero dolores, vel tenetur nobis earum accusantium modi, dolore excepturi eveniet provident tempora sit.
  Fuga sint officiis deserunt aspernatur doloremque odit maxime id nesciunt, incidunt deleniti optio provident possimus nostrum exercitationem beatae tempora tempore cum. Optio dignissimos labore voluptate odio, ex sit omnis ipsa.
  Illum, exercitationem. Natus esse unde optio! Amet mollitia corrupti autem quidem quasi commodi laudantium doloribus sequi natus placeat hic, fugiat cupiditate tempore, laboriosam tempora ducimus enim? Aliquam reiciendis quo provident!
  Explicabo, suscipit asperiores consectetur nisi natus autem quod quos eum nulla temporibus cupiditate, quam, nihil est assumenda consequuntur! Unde vero quia quos nesciunt officiis sequi animi, a eos totam hic.
  Totam eveniet, illum veniam possimus officiis iusto a accusantium aperiam magni, eum vitae expedita aliquid similique. Voluptate maxime nulla quam suscipit ab molestias quas nobis. Esse cupiditate ipsa eius quibusdam!
  Facilis possimus culpa, doloremque inventore necessitatibus deserunt quibusdam? Tempore aperiam quo, a magni perspiciatis itaque fugit aspernatur ullam, tenetur commodi eos! Illo impedit dolor rem dolorem aliquid, dolorum earum iusto!
  Quisquam laboriosam nemo sed illo vero? Praesentium quisquam impedit officia illum doloremque alias nemo, tempora debitis optio totam, corporis quibusdam doloribus iure ipsa eveniet expedita architecto? Molestiae, consequatur nostrum! Dignissimos.
  Molestiae minima libero culpa distinctio dolor reprehenderit veritatis delectus perferendis quibusdam quam? Consequatur sunt eius maxime eaque impedit laudantium sit aspernatur odit totam blanditiis. Aliquam in temporibus harum reiciendis ab!
  Sapiente doloribus id numquam facilis reiciendis dolore magnam voluptatem sit, illum suscipit quaerat ipsum quasi illo obcaecati aut, sequi, temporibus similique. Officiis dolor rem, ratione blanditiis atque culpa quos vel?
  Repellat impedit incidunt expedita ullam dolor aut eum voluptatibus, quo aspernatur sequi maiores ab officiis aperiam in quas quaerat debitis vel eligendi non, tempora nesciunt, blanditiis atque voluptatum quibusdam? Dignissimos?
  Totam rem ducimus cum illo id cumque officia tempore. Tempore autem officia harum explicabo aliquam perspiciatis quae totam eius vitae qui at, ullam, odio obcaecati necessitatibus illum? Consectetur, quidem fugiat.
  Veniam consectetur iusto atque earum ipsam fugit, quae voluptatum amet id inventore. Voluptatibus, dolor delectus nesciunt, neque praesentium eum error reiciendis nihil quae incidunt, earum obcaecati explicabo vitae soluta minus.
  Debitis hic adipisci earum in illum? Aperiam, cum commodi voluptatem a vel sint doloribus ad autem inventore blanditiis expedita soluta itaque iure eaque numquam! Architecto ducimus veniam eius odio sed?
  Qui, totam, expedita ad at error eum deleniti laudantium quisquam nisi neque ipsum possimus eaque. Perspiciatis, fugiat! Iste, quas quisquam doloremque pariatur voluptatibus laudantium iusto aliquid modi mollitia harum eveniet.
  In natus nemo, veniam consectetur eligendi assumenda, nisi eius ipsum quo non tempore blanditiis amet optio, doloribus aspernatur repellat ut aliquid reprehenderit laboriosam? Nostrum animi eius id assumenda dolore quia!
  Assumenda at fugit temporibus, deserunt est quo eum obcaecati asperiores nihil? Voluptatem ab expedita adipisci quo cum eaque amet omnis nobis, necessitatibus officia atque velit! Id expedita consequatur similique unde?
  Magni perspiciatis nostrum omnis voluptate harum illum sunt eius excepturi repudiandae? Modi iste autem architecto, adipisci assumenda cupiditate? Voluptates amet perferendis error nulla eaque vitae quod corporis quasi aperiam eligendi.
  Optio, reprehenderit excepturi? Odio velit eligendi magni nemo nulla numquam non sint nihil enim minima doloribus at explicabo aliquam aliquid deserunt cum dolor quis laborum unde ipsa vel, eaque quia.
  Neque ratione ab doloribus ipsum eum officiis beatae voluptas perferendis esse mollitia cupiditate quasi praesentium nobis eos odit quis placeat, aliquam suscipit molestias similique culpa? Odit temporibus recusandae neque officiis.
  Ut eaque voluptate modi   Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam consequatur quae ducimus accusamus vero numquam consequuntur in non. Delectus eum dignissimos cupiditate consequuntur molestias, sint ex accusantium totam commodi eaque.
  Sequi minima eveniet beatae voluptatem amet mollitia fuga nostrum eligendi veniam sunt similique explicabo deleniti quae reiciendis facilis, cumque veritatis nisi consequatur pariatur delectus debitis. Aut enim officiis iure dolorem.
  Sunt qui explicabo cum animi deleniti nesciunt ea amet et consequatur aperiam sit nihil veritatis ab libero voluptas totam corporis voluptatem a veniam, cumque saepe quasi hic cupiditate quas. Nam!
  Nam officia laborum nisi! Voluptatum id, quam aliquid praesentium iusto cum. Earum suscipit voluptatum exercitationem facilis aperiam hic quam perferendis voluptate officiis quis temporibus, quos quidem obcaecati, alias architecto. Optio?
  Optio ratione sit sequi laudantium dolorem vero quaerat distinctio! Ipsum fugit quisquam suscipit repudiandae rerum, provident optio laboriosam sint perspiciatis id numquam similique voluptas reiciendis ad et laborum. Ex, nulla?
  Quis velit dicta praesentium dolores culpa ipsum maxime fugit! Veniam ad pariatur eaque non. Quidem, molestiae aperiam nostrum temporibus eveniet rerum eos odit aliquam iure facere neque perferendis incidunt velit?
  Blanditiis unde aperiam dolorem delectus aspernatur ut distinctio maiores ipsa culpa voluptate tempore alias aut dignissimos laborum molestiae consequatur porro illo et id, nisi eius quas mollitia? Quos, iste quod.
  Eligendi atque tenetur officiis? Atque inventore possimus aut veritatis error odit doloribus, et assumenda distinctio labore, minus ut voluptatum similique sint, ab modi. Cum voluptatibus impedit velit officia. Ut, deserunt!
  Magni ut vero eveniet, suscipit asperiores nam tempore. Asperiores beatae corrupti recusandae! Quis tempore temporibus reprehenderit quae reiciendis dolorum ex sit illum nobis incidunt. Aut obcaecati repellendus quibusdam placeat commodi?
  Provident atque rerum recusandae blanditiis odit. Nisi blanditiis molestiae accusantium reiciendis, illum deserunt corporis dolor, consequatur fugiat pariatur ab odio omnis debitis excepturi autem, quas alias odit adipisci commodi ipsa!asperiores eos, saepe iusto quaerat mollitia qui iste quasi, incidunt adipisci dolor soluta, quidem sunt sed inventore neque? Eius molestias corrupti sit architecto laborum et non.cum omnis doloribus nam optio maxime temporibus corrupti est dicta! Exercitationem quia earum cumque tempore, eaque corrupti, deleniti, deserunt adipisci molestias quas dicta voluptas et iste`,
      date: "Jan 1, 2023",
      publisher: "John Doe",
      avatar: "https://via.placeholder.com/40",
      image: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {
    const fetchArticleById = async () => {
      try {
        const response = await userAxiosInstance.get(`${getArticlesApi}/${id}`);
        console.log(response.data.articles, "articles");

        if (response.data && response.data.status === "success") {
          setArticle(response.data.articles[0]);
        }
      } catch (error) {
        console.error(error, "error in fetching article");
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          console.log("An unexpected error occurred.", message);
        }
      }
    };

    if (id !== null) {
      fetchArticleById();
    }
  }, [id]);

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 w-full ">
        <div className="p-4 w-full md:w-2/3 text-center pb-5">
          <h1 className="text-5xl font-handwrite">{article?.title}</h1>
        </div>
        <div className="px-4 w-full md:w-2/3 text-center">
          <div className="flex">
            <div className="flex items-center">
              <div
                className="w-10 h-10 mr-3 flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: stringToColor(
                    article?.author?.name|| "Unknown"
                  ),
                }}
              >
                <span className="text-white font-bold">
                  {getInitials(article?.author?.name || 'unknown')}
                </span>
              </div>
              <div>
                <p className="text-start text-sm font-semibold text-gray-900">
                  {article?.author.name}
                </p>
                <p className="text-xs text-gray-500">
                  Published on {dateFormatter(article?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 w-full md:w-2/3 text-center">
          <div className="w-full md:min-w-screen h-56 md:min-h-[60vh] mt-5 overflow-hidden rounded-md shadow-sm">
            <img
              src={article?.image?.location}
              alt="Article"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="p-4 w-full md:w-2/3 text-center">
          <p className="mt-4 mb-4 text-lg leading-relaxed font-customSans mx-4 gap-y-4 whitespace-pre-wrap text-left">
            {article?.overView}
          </p>
        </div>
      </div>
    </>
  );
}
