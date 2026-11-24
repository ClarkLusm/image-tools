import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import {
  createPageMetadata,
  resolveSupportedLanguage,
} from "@/app/lib/metadata";
import ToolNextActions from "@/app/components/tools/tool-next-actions";
import { getToolNextActions } from "@/app/lib/tool-next-actions";
import { pickText } from "@/lib/localized-text";

function getPresets(locale: string) {

  return [
    {
      label: pickText(locale, {
        en: "Facebook Post",
        vi: "Bài đăng Facebook",
        de: "Facebook Beitrag",
      }),
      width: 1200,
      height: 630,
    },
    {
      label: pickText(locale, {
        en: "Facebook Cover",
        vi: "Ảnh bìa Facebook",
        de: "Facebook Titelbild",
      }),
      width: 851,
      height: 315,
    },
    {
      label: pickText(locale, {
        en: "Facebook Profile",
        vi: "Ảnh hồ sơ Facebook",
        de: "Facebook Profil",
      }),
      width: 320,
      height: 320,
    },
    {
      label: pickText(locale, {
        en: "Facebook Story",
        vi: "Tin Facebook",
        de: "Facebook Story",
      }),
      width: 1080,
      height: 1920,
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/resize-facebook",
    title: {
      en: "Resize Facebook Images Online (Free) - Facebook Cover & Post Size Tool",
      vi: "Resize ảnh Facebook online miễn phí - Công cụ kích thước cover và post Facebook",
      de: "Facebook-Bilder online skalieren (kostenlos) - Tool für Titelbild- und Beitragsgrößen",
    },
    description: {
      en: "Resize Facebook images online free with the right Facebook cover size, Facebook post size, Facebook image dimensions, Facebook event cover guidance, and profile image presets.",
      vi: "Resize ảnh Facebook online miễn phí với đúng kích thước cover, post, profile và hướng dẫn event cover Facebook cùng các preset thực tế.",
      de: "Facebook-Bilder kostenlos online skalieren mit den richtigen Größen für Titelbilder, Beiträge, Profilbilder und Event-Cover-Presets.",
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl = SITE_URL;
  const languageCode = resolveSupportedLanguage(locale);
  const nextActions = getToolNextActions("social-resize", languageCode);
  return (
    <ToolLayout
      locale={locale}
      title={
        pickText(locale, {
          en: "Resize Facebook Images Online",
          vi: "Đổi kích thước ảnh Facebook online",
          de: "Facebook-Bilder online skalieren",
        })
      }
      description={
        pickText(locale, {
          en: "Resize for Facebook posts, cover photos, profile images, and stories with practical Facebook image dimensions and creator-friendly presets.",
          vi: "Đổi kích thước cho bài đăng, ảnh bìa, ảnh hồ sơ và tin Facebook với các preset thực tế và dễ dùng cho người sáng tạo.",
          de: "Skaliere Beiträge, Titelbilder, Profilbilder und Stories für Facebook mit praxisnahen und creatorfreundlichen Presets.",
        })
      }
      steps={[
        {
          title: pickText(locale, {
            en: "Upload Image",
            vi: "Tải ảnh lên",
            de: "Bild hochladen",
          }),
          description: pickText(locale, {
            en: "Choose the image you want to prepare for a Facebook post, cover, profile photo, or story.",
            vi: "Chọn hình ảnh bạn muốn chuẩn bị cho bài đăng, ảnh bìa, ảnh hồ sơ hoặc tin Facebook.",
            de: "Wähle das Bild, das du für einen Facebook-Beitrag, ein Titelbild, Profilfoto oder eine Story vorbereiten möchtest.",
          }),
        },
        {
          title: pickText(locale, {
            en: "Select Preset",
            vi: "Chọn preset",
            de: "Preset wählen",
          }),
          description: pickText(locale, {
            en: "Pick the Facebook format you need, from post size to cover photo and profile artwork.",
            vi: "Chọn đúng định dạng Facebook bạn cần, từ ảnh bài đăng đến ảnh bìa và ảnh hồ sơ.",
            de: "Wähle das passende Facebook-Format, von Beitragsbild bis Titelbild und Profilgrafik.",
          }),
        },
        {
          title: pickText(locale, {
            en: "Download",
            vi: "Tải xuống",
            de: "Herunterladen",
          }),
          description: pickText(locale, {
            en: "Export the resized image instantly so it is ready for Facebook upload.",
            vi: "Xuất ảnh đã đổi kích thước ngay để sẵn sàng tải lên Facebook.",
            de: "Exportiere das skalierte Bild sofort, damit es direkt für Facebook bereit ist.",
          }),
        },
      ]}
      faqs={[
        {
          q: pickText(locale, {
            en: "What is Facebook image size?",
            vi: "Kích thước ảnh Facebook là bao nhiêu?",
            de: "Welche Bildgrößen verwendet Facebook?",
          }),
          a: pickText(locale, {
            en: "The answer depends on placement. A common Facebook post image size is 1200 x 630, Page cover photos work well at 851 x 315, and profile photos should be prepared as square images, ideally 320 x 320 for quality. That is why a strong Facebook resize page needs to cover more than one preset instead of treating every upload like a generic social graphic.",
            vi: "Câu trả lời phụ thuộc vào vị trí hiển thị. Kích thước phổ biến cho ảnh bài đăng Facebook là 1200 x 630, ảnh bìa Page hoạt động tốt ở 851 x 315, còn ảnh hồ sơ nên được chuẩn bị dưới dạng vuông, lý tưởng là 320 x 320 để có chất lượng tốt. Vì vậy một trang resize Facebook tốt cần bao phủ nhiều preset thay vì coi mọi ảnh tải lên như một đồ họa mạng xã hội chung chung.",
            de: "Die Antwort hängt von der Platzierung ab. Eine gängige Facebook-Beitragsgröße ist 1200 x 630, Seiten-Titelbilder funktionieren gut mit 851 x 315, und Profilbilder sollten als Quadrat vorbereitet werden, idealerweise mit 320 x 320 für gute Qualität. Genau deshalb sollte eine starke Facebook-Resize-Seite mehr als nur ein einziges Preset abdecken.",
          }),
        },
        {
          q: pickText(locale, {
            en: "What is Facebook cover size?",
            vi: "Kích thước ảnh bìa Facebook là bao nhiêu?",
            de: "Wie groß sollte ein Facebook-Titelbild sein?",
          }),
          a: pickText(locale, {
            en: "Facebook Help says Page cover photos should be at least 400 x 150 pixels and load fastest as an sRGB JPG at 851 x 315. That is the most practical starting point for cover artwork with text or brand elements, especially when you want a clean Facebook cover size that survives desktop and mobile cropping more gracefully.",
            vi: "Tài liệu trợ giúp của Facebook cho biết ảnh bìa Page nên có ít nhất 400 x 150 pixel và tải nhanh nhất dưới dạng JPG sRGB ở 851 x 315. Đây là điểm bắt đầu thực tế nhất cho ảnh bìa có chữ hoặc yếu tố thương hiệu, đặc biệt khi bạn muốn một kích thước cover hoạt động ổn hơn trên cả desktop lẫn mobile.",
            de: "Laut Facebook Help sollten Seiten-Titelbilder mindestens 400 x 150 Pixel groß sein und laden als sRGB-JPG mit 851 x 315 am schnellsten. Das ist der praktischste Ausgangspunkt für Titelgrafiken mit Text oder Branding, besonders wenn sie auf Desktop und Mobilgeräten sauber funktionieren sollen.",
          }),
        },
        {
          q: pickText(locale, {
            en: "What size should I use for a Facebook profile picture?",
            vi: "Tôi nên dùng kích thước nào cho ảnh hồ sơ Facebook?",
            de: "Welche Größe sollte ich für ein Facebook-Profilbild verwenden?",
          }),
          a: pickText(locale, {
            en: "Facebook Help says Page profile photos display at 176 x 176 on desktop and 196 x 196 on smartphones, and recommends uploading a 320 x 320 square image for best quality.",
            vi: "Facebook cho biết ảnh hồ sơ Page sẽ hiển thị ở 176 x 176 trên desktop và 196 x 196 trên điện thoại, đồng thời khuyến nghị tải lên ảnh vuông 320 x 320 để có chất lượng tốt nhất.",
            de: "Facebook gibt an, dass Seiten-Profilfotos auf dem Desktop mit 176 x 176 und auf Smartphones mit 196 x 196 angezeigt werden. Empfohlen wird ein quadratischer Upload mit 320 x 320 für die beste Qualität.",
          }),
        },
        {
          q: pickText(locale, {
            en: "Is Facebook event cover size the same as Page cover size?",
            vi: "Kích thước ảnh bìa sự kiện Facebook có giống ảnh bìa Page không?",
            de: "Ist die Größe eines Facebook-Event-Covers dieselbe wie bei einem Seiten-Titelbild?",
          }),
          a: pickText(locale, {
            en: "No. Facebook event cover visuals behave like a separate wide placement, so reusing a Page cover often leads to awkward crops. If you are preparing event graphics, treat Facebook event cover size as its own asset workflow instead of assuming your standard Page cover will fit perfectly.",
            vi: "Không. Ảnh bìa sự kiện Facebook hoạt động như một vị trí ngang riêng biệt, nên việc tái sử dụng ảnh bìa Page thường dẫn tới crop lệch. Nếu bạn đang chuẩn bị ảnh cho sự kiện, hãy coi đây là một workflow riêng thay vì giả định ảnh bìa Page sẽ khớp hoàn hảo.",
            de: "Nein. Event-Cover auf Facebook verhalten sich wie eine eigene breite Platzierung, daher führt die Wiederverwendung eines normalen Seiten-Titelbilds oft zu unpassenden Zuschnitten. Wenn du Event-Grafiken vorbereitest, solltest du dieses Asset als eigenen Workflow behandeln.",
          }),
        },
        {
          q: pickText(locale, {
            en: "Do you support Facebook story format?",
            vi: "Công cụ có hỗ trợ định dạng tin Facebook không?",
            de: "Unterstützt das Tool auch Facebook Stories?",
          }),
          a: pickText(locale, {
            en: "Yes. Use the 1080 x 1920 vertical preset when you need a Story-friendly layout for mobile viewing.",
            vi: "Có. Hãy dùng preset dọc 1080 x 1920 khi bạn cần bố cục phù hợp cho tin Facebook trên di động.",
            de: "Ja. Nutze das vertikale 1080 x 1920-Preset, wenn du ein Story-taugliches Layout für mobile Facebook-Anzeige brauchst.",
          }),
        },
        {
          q: pickText(locale, {
            en: "Are my files uploaded?",
            vi: "Tệp của tôi có bị tải lên không?",
            de: "Werden meine Dateien hochgeladen?",
          }),
          a: pickText(locale, {
            en: "No. All resizing happens locally in your browser, so you can prepare Facebook assets without sending the image to our server.",
            vi: "Không. Toàn bộ quá trình resize diễn ra cục bộ trong trình duyệt, nên bạn có thể chuẩn bị tài sản cho Facebook mà không cần gửi ảnh lên máy chủ của chúng tôi.",
            de: "Nein. Die gesamte Größenänderung läuft lokal in deinem Browser, sodass du Facebook-Assets vorbereiten kannst, ohne Bilder an unseren Server zu senden.",
          }),
        },
      ]}
      relatedTools={[
        { name: pickText(locale, {
          en: "Resize Instagram Image",
          vi: "Resize ảnh Instagram",
          de: "Instagram-Bild skalieren",
        }), path: "/resize-instagram" },
        { name: pickText(locale, {
          en: "Resize TikTok Image",
          vi: "Resize ảnh TikTok",
          de: "TikTok-Bild skalieren",
        }), path: "/resize-tiktok" },
        { name: pickText(locale, {
          en: "Resize YouTube Image",
          vi: "Resize ảnh YouTube",
          de: "YouTube-Bild skalieren",
        }), path: "/resize-youtube" },
        { name: pickText(locale, {
          en: "Compress Image",
          vi: "Nén ảnh",
          de: "Bild komprimieren",
        }), path: "/compress-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-facebook"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          {
            name: pickText(locale, {
              en: "Resize for Facebook",
              vi: "Resize cho Facebook",
              de: "Für Facebook skalieren",
            }),
            url: `${siteUrl}/resize-facebook`,
          },
        ]}
      />
      <SocialResizeClient presets={getPresets(locale)} defaultPresetIndex={0} />

      <ToolNextActions
        className="mt-10"
        title={nextActions.title}
        description={nextActions.description}
        items={nextActions.items}
      />

      <section className="mt-24 space-y-12 bg-card">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {pickText(locale, {
              en: "Quick Facebook Size Guide",
              vi: "Hướng dẫn nhanh về kích thước ảnh Facebook",
              de: "Kurzanleitung zu Facebook-Bildgrößen",
            })}
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            {pickText(locale, {
              en: "If you want the essentials first, start here. Facebook post, cover, and profile placements each have different needs, so using a dedicated preset is the fastest way to avoid awkward crops and blurry uploads.",
              vi: "Nếu bạn chỉ cần những thông tin cốt lõi, hãy bắt đầu từ đây. Ảnh bài đăng, ảnh bìa và ảnh hồ sơ trên Facebook có yêu cầu khác nhau, nên dùng preset riêng là cách nhanh nhất để tránh cắt lệch và ảnh bị mờ.",
              de: "Wenn du nur die wichtigsten Grundlagen brauchst, starte hier. Beiträge, Titelbilder und Profilbilder auf Facebook haben unterschiedliche Anforderungen, deshalb ist ein eigenes Preset der schnellste Weg, um unsaubere Zuschnitte und Unschärfe zu vermeiden.",
            })}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "Facebook Cover Size",
                vi: "Kích thước ảnh bìa Facebook",
                de: "Facebook-Titelbildgröße",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "Facebook Help says Page cover images load fastest at 851 x 315. Keep important text away from the far edges because cover art is cropped differently across devices.",
                vi: "Trung tâm trợ giúp Facebook cho biết ảnh bìa Trang tải nhanh nhất ở kích thước 851 x 315. Hãy giữ nội dung quan trọng cách xa mép ngoài vì ảnh bìa bị cắt khác nhau trên từng thiết bị.",
                de: "Laut Facebook Help laden Seiten-Titelbilder mit 851 x 315 am schnellsten. Halte wichtige Texte von den Rändern fern, weil Titelbilder je nach Gerät unterschiedlich beschnitten werden.",
              })}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "Facebook Post Size",
                vi: "Kích thước ảnh bài đăng Facebook",
                de: "Facebook-Beitragsgröße",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "1200 x 630 is a practical default for shared posts, previews, and social graphics. It is one of the most useful long-tail Facebook image dimensions to target.",
                vi: "1200 x 630 là kích thước mặc định thực tế cho bài chia sẻ, ảnh preview và đồ họa mạng xã hội. Đây là một trong những kích thước Facebook hữu ích nhất để tối ưu.",
                de: "1200 x 630 ist ein praxisnaher Standard für geteilte Beiträge, Vorschauen und Social-Grafiken. Es ist eine der nützlichsten Facebook-Bildgrößen für die Optimierung.",
              })}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "Profile Image",
                vi: "Ảnh hồ sơ",
                de: "Profilbild",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "Profile images are displayed as circles, so a clean 320 x 320 square source gives you better control over logos, faces, and centered branding.",
                vi: "Ảnh hồ sơ được hiển thị theo dạng hình tròn, nên ảnh nguồn vuông 320 x 320 sạch sẽ giúp bạn kiểm soát logo, khuôn mặt và nhận diện trung tâm tốt hơn.",
                de: "Profilbilder werden kreisförmig dargestellt, deshalb gibt dir eine saubere 320 x 320-Quadratquelle bessere Kontrolle über Logos, Gesichter und zentriertes Branding.",
              })}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "Event Cover Workflow",
                vi: "Quy trình chuẩn bị ảnh bìa sự kiện",
                de: "Workflow für Event-Cover",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "Event graphics should be treated as a separate wide asset. If you are targeting Facebook event cover size searches, avoid reusing your Page cover art and prepare a dedicated image instead.",
                vi: "Đồ họa cho sự kiện nên được xử lý như một tài sản ngang riêng biệt. Nếu bạn đang tối ưu cho ảnh bìa sự kiện Facebook, đừng tái sử dụng ảnh bìa Page mà hãy chuẩn bị một ảnh riêng.",
                de: "Event-Grafiken sollten als eigenes breites Asset behandelt werden. Wenn du für Facebook-Event-Cover optimierst, verwende nicht einfach dein Seiten-Titelbild erneut, sondern bereite eine eigene Grafik vor.",
              })}
            </p>
          </article>
        </div>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {pickText(locale, {
                en: "Facebook Post Size",
                vi: "Kích thước ảnh bài đăng Facebook",
                de: "Facebook-Beitragsgröße",
              })}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "For feed posts and shared graphics, 1200 x 630 remains a clean default because it balances quality with compatibility across link previews and general Facebook post layouts. It is also one of the most practical answers to searches like ",
                vi: "Với ảnh bài đăng và đồ họa chia sẻ, 1200 x 630 vẫn là lựa chọn mặc định rất thực tế vì nó cân bằng tốt giữa chất lượng và khả năng tương thích trong preview link cũng như bố cục bài đăng Facebook. Đây cũng là một trong những câu trả lời thực tế nhất cho các truy vấn như ",
                de: "Für Feed-Beiträge und geteilte Grafiken bleibt 1200 x 630 ein sehr sauberer Standard, weil es Qualität und Kompatibilität in Link-Vorschauen und typischen Facebook-Beitragslayouts gut ausbalanciert. Es ist außerdem eine der praktischsten Antworten auf Suchanfragen wie ",
              })}
              <span className="font-medium text-foreground">
                facebook post size
              </span>{" "}
              {pickText(locale, {
                en: "and ",
                vi: "và ",
                de: "und ",
              })}
              <span className="font-medium text-foreground">
                facebook post dimensions
              </span>
              .
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {pickText(locale, {
                en: "Facebook Profile Picture Size",
                vi: "Kích thước ảnh hồ sơ Facebook",
                de: "Facebook-Profilbildgröße",
              })}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "Profile photos are cropped to a circle in the interface, so the safest source image is still a square. Facebook says a Page profile picture should be 320 x 320 for best quality, which makes it easier to keep logos, faces, and centered brand marks visible after the circular crop is applied.",
                vi: "Ảnh hồ sơ sẽ bị cắt thành hình tròn trong giao diện, nên ảnh nguồn an toàn nhất vẫn là ảnh vuông. Facebook cho biết ảnh hồ sơ Page nên dùng 320 x 320 để có chất lượng tốt nhất, nhờ đó logo, khuôn mặt và nhận diện trung tâm sẽ dễ được giữ trọn hơn sau khi áp dụng crop tròn.",
                de: "Profilfotos werden in der Oberfläche kreisförmig beschnitten, daher bleibt eine quadratische Quelle die sicherste Wahl. Facebook empfiehlt für Seiten-Profilbilder 320 x 320, damit Logos, Gesichter und zentrierte Branding-Elemente nach dem runden Zuschnitt besser erhalten bleiben.",
              })}
            </p>
          </article>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {pickText(locale, {
                en: "Best Aspect Ratio for Facebook",
                vi: "Tỷ lệ khung hình tốt nhất cho Facebook",
                de: "Bestes Seitenverhältnis für Facebook",
              })}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "There is no single best Facebook aspect ratio for every use case. Wide images work best for covers and many shared post graphics, square images are strongest for profile photos and simple branded visuals, and vertical 9:16 is the right fit for Stories. Matching the ratio to the placement is more important than forcing one image size everywhere.",
                vi: "Không có một tỷ lệ Facebook tốt nhất cho mọi trường hợp. Ảnh ngang phù hợp nhất cho cover và nhiều đồ họa bài đăng, ảnh vuông mạnh hơn cho ảnh hồ sơ và hình ảnh thương hiệu đơn giản, còn 9:16 dọc là lựa chọn đúng cho tin Facebook. Khớp tỷ lệ với vị trí hiển thị quan trọng hơn việc cố ép một kích thước dùng cho tất cả.",
                de: "Es gibt nicht das eine beste Facebook-Seitenverhältnis für jeden Anwendungsfall. Breite Bilder funktionieren am besten für Titelbilder und viele Beitragsgrafiken, quadratische Bilder sind stärker für Profilfotos und einfache Markenvisuals, und vertikales 9:16 ist die passende Wahl für Stories. Das Verhältnis an die Platzierung anzupassen ist wichtiger als überall dieselbe Größe zu erzwingen.",
              })}
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {pickText(locale, {
                en: "How to Resize Image for Facebook",
                vi: "Cách đổi kích thước ảnh cho Facebook",
                de: "So skalierst du Bilder für Facebook",
              })}
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "Upload your image, choose the right Facebook preset, and export the final size. If you need better framing, open ",
                vi: "Tải ảnh lên, chọn đúng preset Facebook rồi xuất kích thước cuối cùng. Nếu cần căn lại bố cục tốt hơn, hãy mở ",
                de: "Lade dein Bild hoch, wähle das passende Facebook-Preset und exportiere die finale Größe. Wenn du ein besseres Framing brauchst, öffne zuerst ",
              })}
              <Link
                href="/crop-image"
                className="font-medium text-primary hover:underline"
              >
                {pickText(locale, {
                  en: "Crop Image",
                  vi: "Cắt ảnh",
                  de: "Bild zuschneiden",
                })}
              </Link>{" "}
              {pickText(locale, {
                en: "first. If the output file is still larger than needed, finish with ",
                vi: "trước. Nếu tệp đầu ra vẫn lớn hơn mức cần thiết, hãy hoàn tất bằng ",
                de: "zuerst. Wenn die Ausgabedatei danach immer noch größer ist als nötig, schließe mit ",
              })}
              <Link
                href="/compress-image"
                className="font-medium text-primary hover:underline"
              >
                {pickText(locale, {
                  en: "Compress Image",
                  vi: "Nén ảnh",
                  de: "Bild komprimieren",
                })}
              </Link>{" "}
              {pickText(locale, {
                en: "before publishing.",
                vi: "trước khi xuất bản.",
                de: "ab, bevor du veröffentlichst.",
              })}
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {pickText(locale, {
              en: "Build a Better Social Workflow",
              vi: "Xây dựng quy trình mạng xã hội tốt hơn",
              de: "Einen besseren Social-Workflow aufbauen",
            })}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {pickText(locale, {
              en: "Facebook resize works even better when it sits inside a broader social publishing flow. Continue into ",
              vi: "Resize cho Facebook sẽ hiệu quả hơn nữa khi nằm trong một quy trình xuất bản mạng xã hội rộng hơn. Hãy tiếp tục sang ",
              de: "Facebook-Resize funktioniert noch besser, wenn es Teil eines größeren Social-Publishing-Workflows ist. Wechsle anschließend zu ",
            })}
            <Link
              href="/resize-instagram"
              className="font-medium text-primary hover:underline"
            >
              {pickText(locale, {
                en: "Resize Instagram",
                vi: "Đổi kích thước cho Instagram",
                de: "Instagram skalieren",
              })}
            </Link>
            ,{" "}
            <Link
              href="/resize-tiktok"
              className="font-medium text-primary hover:underline"
            >
              {pickText(locale, {
                en: "Resize TikTok",
                vi: "Đổi kích thước cho TikTok",
                de: "TikTok skalieren",
              })}
            </Link>
            , and{" "}
            <Link
              href="/resize-youtube"
              className="font-medium text-primary hover:underline"
            >
              {pickText(locale, {
                en: "Resize YouTube",
                vi: "Đổi kích thước cho YouTube",
                de: "YouTube skalieren",
              })}
            </Link>{" "}
            {pickText(locale, {
              en: "when you want a more consistent multi-platform asset pipeline.",
              vi: "khi bạn muốn một chuỗi tài sản đa nền tảng nhất quán hơn.",
              de: "wenn du eine konsistentere Multi-Plattform-Asset-Pipeline aufbauen möchtest.",
            })}
          </p>
        </section>
      </section>
    </ToolLayout>
  );
}
