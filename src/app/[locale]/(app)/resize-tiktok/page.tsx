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
        en: "TikTok Vertical",
        vi: "TikTok dọc",
        de: "TikTok Hochformat",
      }),
      width: 1080,
      height: 1920,
    },
    {
      label: pickText(locale, {
        en: "TikTok Profile",
        vi: "Ảnh hồ sơ TikTok",
        de: "TikTok Profil",
      }),
      width: 200,
      height: 200,
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
    path: "/resize-tiktok",
    title: {
      en: "Resize TikTok Image Online Free",
      vi: "Resize ảnh TikTok online miễn phí",
      de: "TikTok-Bilder online kostenlos skalieren",
    },
    description: {
      en: "Resize TikTok image online free. Prepare the right TikTok image size, TikTok dimensions, and assets for TikTok posts, profile images, thumbnails, and cover visuals.",
      vi: "Resize ảnh TikTok online miễn phí. Chuẩn bị đúng kích thước ảnh TikTok, dimensions và tài nguyên cho bài đăng, ảnh hồ sơ, thumbnail và ảnh cover.",
      de: "TikTok-Bilder kostenlos online skalieren. Bereite die richtigen TikTok-Bildgrößen und Assets für Posts, Profilbilder, Thumbnails und Cover-Visuals vor.",
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
          en: "Resize TikTok Image Online Free",
          vi: "Resize ảnh TikTok online miễn phí",
          de: "TikTok-Bilder online kostenlos skalieren",
        })
      }
      description={
        pickText(locale, {
          en: "Resize for TikTok post, profile, thumbnail, and cover workflows with the right TikTok image size and creator-friendly TikTok dimensions.",
          vi: "Đổi kích thước cho bài đăng, ảnh hồ sơ, thumbnail và ảnh bìa TikTok với các thông số thực tế, thân thiện cho người sáng tạo.",
          de: "Skaliere TikTok-Posts, Profilbilder, Thumbnails und Cover mit praxisnahen TikTok-Maßen für Creator.",
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
            en: "Choose the image you want to prepare for TikTok posts, cover art, or profile use.",
            vi: "Chọn ảnh bạn muốn chuẩn bị cho bài đăng TikTok, ảnh bìa hoặc ảnh hồ sơ.",
            de: "Wähle das Bild aus, das du für TikTok-Posts, Cover oder Profilnutzung vorbereiten möchtest.",
          }),
        },
        {
          title: pickText(locale, {
            en: "Select TikTok Dimensions",
            vi: "Chọn kích thước TikTok",
            de: "TikTok-Maße wählen",
          }),
          description: pickText(locale, {
            en: "Pick a vertical TikTok preset or a square profile size depending on where the asset will appear.",
            vi: "Chọn preset TikTok dọc hoặc kích thước hồ sơ vuông tùy theo nơi tài sản sẽ xuất hiện.",
            de: "Wähle ein vertikales TikTok-Preset oder ein quadratisches Profilmaß je nachdem, wo das Asset erscheinen soll.",
          }),
        },
        {
          title: pickText(locale, {
            en: "Download and Publish",
            vi: "Tải xuống và đăng",
            de: "Herunterladen und veröffentlichen",
          }),
          description: pickText(locale, {
            en: "Export the resized image instantly, then post to TikTok with dimensions that fit the platform more cleanly.",
            vi: "Xuất ảnh đã đổi kích thước ngay, rồi đăng lên TikTok với thông số khớp nền tảng gọn gàng hơn.",
            de: "Exportiere das skalierte Bild sofort und veröffentliche es auf TikTok mit sauber passenden Plattformmaßen.",
          }),
        },
      ]}
      faqs={[
        {
          q: pickText(locale, {
            en: "What is TikTok image size?",
            vi: "Kích thước ảnh TikTok là bao nhiêu?",
            de: "Welche Bildgröße verwendet TikTok?",
          }),
          a: pickText(locale, {
            en: "For most creator workflows, a 1080 x 1920 vertical canvas remains the safest working size because TikTok is built around a 9:16 full-screen layout. For profile artwork, a square image is easier to prepare and then TikTok applies its own crop inside the profile UI.",
            vi: "Với phần lớn quy trình của người sáng tạo, canvas dọc 1080 x 1920 vẫn là kích thước làm việc an toàn nhất vì TikTok được xây quanh bố cục toàn màn hình 9:16. Với ảnh hồ sơ, ảnh vuông sẽ dễ chuẩn bị hơn và sau đó TikTok tự crop trong giao diện hồ sơ.",
            de: "Für die meisten Creator-Workflows bleibt eine vertikale 1080 x 1920-Leinwand die sicherste Arbeitsgröße, weil TikTok um ein 9:16-Vollbildlayout herum gebaut ist. Für Profilbilder lässt sich ein quadratisches Bild einfacher vorbereiten, bevor TikTok es in der Profiloberfläche selbst zuschneidet.",
          }),
        },
        {
          q: pickText(locale, {
            en: "Can I resize TikTok cover photo?",
            vi: "Tôi có thể resize ảnh bìa TikTok không?",
            de: "Kann ich ein TikTok-Coverbild skalieren?",
          }),
          a: pickText(locale, {
            en: "Yes. You can prepare a vertical image for TikTok cover or thumbnail usage so the source file already matches the platform's visual direction. A clean 9:16 source usually gives you more flexibility when selecting the visible cover area later.",
            vi: "Có. Bạn có thể chuẩn bị một ảnh dọc cho ảnh bìa hoặc thumbnail TikTok để tệp nguồn đã khớp với định hướng hiển thị của nền tảng. Một ảnh nguồn 9:16 sạch thường cho bạn nhiều linh hoạt hơn khi chọn vùng hiển thị sau này.",
            de: "Ja. Du kannst ein vertikales Bild für TikTok-Cover oder Thumbnails vorbereiten, sodass die Quelldatei bereits zur visuellen Ausrichtung der Plattform passt. Eine saubere 9:16-Quelle gibt dir später meist mehr Freiheit bei der sichtbaren Auswahl.",
          }),
        },
        {
          q: pickText(locale, {
            en: "What TikTok dimensions should I use for a profile picture?",
            vi: "Tôi nên dùng kích thước TikTok nào cho ảnh hồ sơ?",
            de: "Welche TikTok-Maße sollte ich für ein Profilbild verwenden?",
          }),
          a: pickText(locale, {
            en: "TikTok's Help Center notes that profile photos must be at least 20 x 20 pixels, but in practice you should upload a much larger square image for better clarity. A 200 x 200 square preset is a simple baseline for profile artwork and avatars.",
            vi: "Trung tâm trợ giúp TikTok lưu ý rằng ảnh hồ sơ phải có ít nhất 20 x 20 pixel, nhưng trên thực tế bạn nên tải lên ảnh vuông lớn hơn nhiều để có độ rõ tốt hơn. Preset vuông 200 x 200 là mức cơ bản đơn giản cho ảnh hồ sơ và avatar.",
            de: "Das TikTok-Hilfecenter weist darauf hin, dass Profilfotos mindestens 20 x 20 Pixel groß sein müssen. In der Praxis solltest du jedoch ein deutlich größeres quadratisches Bild hochladen, um mehr Klarheit zu bekommen. Ein 200 x 200-Quadrat ist ein einfacher Ausgangspunkt für Profilgrafiken und Avatare.",
          }),
        },
        {
          q: pickText(locale, {
            en: "Should I compress a TikTok image before uploading?",
            vi: "Tôi có nên nén ảnh TikTok trước khi tải lên không?",
            de: "Sollte ich ein TikTok-Bild vor dem Upload komprimieren?",
          }),
          a: pickText(locale, {
            en: "Usually yes, especially when the original file is oversized. Resizing first and then running a light compression pass can reduce file weight while keeping the image sharp enough for mobile viewing.",
            vi: "Thường là có, đặc biệt khi tệp gốc quá nặng. Đổi kích thước trước rồi nén nhẹ sẽ giúp giảm dung lượng mà vẫn giữ ảnh đủ sắc nét để xem trên di động.",
            de: "Meistens ja, besonders wenn die Originaldatei zu groß ist. Erst skalieren und anschließend leicht komprimieren senkt das Dateigewicht und hält das Bild dennoch scharf genug für mobile Nutzung.",
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
        scriptId="breadcrumbs-resize-tiktok"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          {
            name: pickText(locale, {
              en: "Resize for TikTok",
              vi: "Resize cho TikTok",
              de: "Für TikTok skalieren",
            }),
            url: `${siteUrl}/resize-tiktok`,
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
              en: "Quick TikTok Size Guide",
              vi: "Hướng dẫn nhanh về kích thước ảnh TikTok",
              de: "Kurzanleitung zu TikTok-Bildgrößen",
            })}
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            {pickText(locale, {
              en: "If you only need the essentials, start here. Vertical 9:16 is the safest default for TikTok-facing creative, while square artwork is the easiest format for profile images and branding assets.",
              vi: "Nếu bạn chỉ cần các thông tin cốt lõi, hãy bắt đầu từ đây. Tỷ lệ dọc 9:16 là mặc định an toàn nhất cho nội dung hướng tới TikTok, còn ảnh vuông là định dạng dễ dùng nhất cho ảnh hồ sơ và tài sản nhận diện.",
              de: "Wenn du nur die wichtigsten Grundlagen brauchst, starte hier. Vertikales 9:16 ist die sicherste Standardwahl für TikTok-orientierte Visuals, während quadratische Grafiken für Profilbilder und Branding am einfachsten funktionieren.",
            })}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "TikTok Profile Size",
                vi: "Kích thước ảnh hồ sơ TikTok",
                de: "TikTok-Profilgröße",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "TikTok says profile photos must be at least 20 x 20 pixels, but a larger square image gives cleaner results for avatars and brand marks.",
                vi: "TikTok cho biết ảnh hồ sơ phải có ít nhất 20 x 20 pixel, nhưng ảnh vuông lớn hơn sẽ cho kết quả sạch hơn với avatar và dấu hiệu thương hiệu.",
                de: "TikTok gibt an, dass Profilfotos mindestens 20 x 20 Pixel groß sein müssen, aber ein größeres quadratisches Bild liefert sauberere Ergebnisse für Avatare und Markenmerkmale.",
              })}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "TikTok Video Ratio",
                vi: "Tỷ lệ ảnh video TikTok",
                de: "TikTok-Videoverhältnis",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "1080 x 1920 remains the most practical TikTok dimension for vertical content because it matches the app&apos;s 9:16 viewing experience.",
                vi: "1080 x 1920 vẫn là kích thước thực tế nhất cho nội dung dọc trên TikTok vì nó khớp trải nghiệm xem 9:16 của ứng dụng.",
                de: "1080 x 1920 bleibt das praktischste TikTok-Maß für vertikale Inhalte, weil es dem 9:16-Seherlebnis der App entspricht.",
              })}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "TikTok Thumbnail",
                vi: "Thumbnail TikTok",
                de: "TikTok-Thumbnail",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "Start with a clean vertical source if you want more freedom when framing a thumbnail or cover-style image later.",
                vi: "Hãy bắt đầu với một ảnh nguồn dọc sạch nếu bạn muốn linh hoạt hơn khi căn thumbnail hoặc ảnh kiểu cover về sau.",
                de: "Beginne mit einer sauberen vertikalen Quelle, wenn du später mehr Freiheit beim Framing eines Thumbnails oder coverartigen Bildes haben möchtest.",
              })}
            </p>
          </article>
        </div>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {pickText(locale, {
              en: "How to Resize Image for TikTok",
              vi: "Cách đổi kích thước ảnh cho TikTok",
              de: "So skalierst du Bilder für TikTok",
            })}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {pickText(locale, {
              en: "Upload your source image, pick the TikTok preset that matches your goal, and export the resized file. If composition matters, use ",
              vi: "Tải ảnh nguồn lên, chọn preset TikTok phù hợp với mục tiêu của bạn, rồi xuất tệp đã đổi kích thước. Nếu bố cục quan trọng, hãy dùng ",
              de: "Lade dein Quellbild hoch, wähle das TikTok-Preset passend zu deinem Ziel und exportiere die skalierte Datei. Wenn die Komposition wichtig ist, nutze zuerst ",
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
              en: "first. If the file is still heavier than it needs to be, finish with ",
              vi: "trước. Nếu tệp vẫn còn nặng hơn mức cần thiết, hãy hoàn tất bằng ",
              de: "zuerst. Wenn die Datei danach immer noch schwerer ist als nötig, schließe mit ",
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
              en: "for a lighter upload.",
              vi: "để có bản tải lên nhẹ hơn.",
              de: "ab, um eine leichtere Upload-Datei zu erhalten.",
            })}
          </p>
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
              en: "TikTok resize works best as part of a broader content pipeline. Once your asset is ready here, continue into ",
              vi: "Tính năng resize cho TikTok hoạt động hiệu quả nhất khi là một phần của quy trình nội dung rộng hơn. Khi ảnh đã sẵn sàng tại đây, bạn có thể tiếp tục sang ",
              de: "TikTok-Resize funktioniert am besten als Teil einer größeren Content-Pipeline. Wenn dein Asset hier fertig ist, kannst du weiter zu ",
            })}
            <Link
              href="/resize-instagram"
              className="font-medium text-primary hover:underline"
            >
              {pickText(locale, {
                en: "Instagram resize",
                vi: "resize cho Instagram",
                de: "Instagram-Resize",
              })}
            </Link>
            ,{" "}
            <Link
              href="/resize-youtube"
              className="font-medium text-primary hover:underline"
            >
              {pickText(locale, {
                en: "YouTube resize",
                vi: "resize cho YouTube",
                de: "YouTube-Resize",
              })}
            </Link>
            , and{" "}
            <Link
              href="/compress-image"
              className="font-medium text-primary hover:underline"
            >
              {pickText(locale, {
                en: "image compression",
                vi: "nén ảnh",
                de: "Bildkomprimierung",
              })}
            </Link>{" "}
            {pickText(locale, {
              en: "to keep your social assets consistent and lightweight.",
              vi: "để giữ cho tài sản mạng xã hội của bạn nhất quán và gọn nhẹ.",
              de: "um deine Social-Assets konsistent und leichtgewichtig zu halten.",
            })}
          </p>
        </section>
      </section>
    </ToolLayout>
  );
}
