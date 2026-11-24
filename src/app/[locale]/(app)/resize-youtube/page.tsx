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
        en: "YouTube Thumbnail",
        vi: "Thumbnail YouTube",
        de: "YouTube Thumbnail",
      }),
      width: 1280,
      height: 720,
    },
    {
      label: pickText(locale, {
        en: "YouTube Shorts",
        vi: "YouTube Shorts",
        de: "YouTube Shorts",
      }),
      width: 1080,
      height: 1920,
    },
    {
      label: pickText(locale, {
        en: "YouTube Channel Banner",
        vi: "Banner kênh YouTube",
        de: "YouTube Kanalbanner",
      }),
      width: 2560,
      height: 1440,
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
    path: "/resize-youtube",
    title: {
      en: "Resize YouTube Thumbnail Online (Free) - YouTube Image Size Tool 2026",
      vi: "Resize thumbnail YouTube online miễn phí - Công cụ kích thước ảnh YouTube 2026",
      de: "YouTube-Thumbnail online skalieren (kostenlos) - YouTube-Bildgrößen-Tool 2026",
    },
    description: {
      en: "Resize YouTube thumbnail online free with the right YouTube image size, YouTube thumbnail size, YouTube dimensions, banner size, and Shorts image presets.",
      vi: "Resize thumbnail YouTube online miễn phí với đúng kích thước ảnh YouTube, thumbnail, banner và preset ảnh cho Shorts.",
      de: "YouTube-Thumbnails kostenlos online skalieren mit den richtigen YouTube-Bildgrößen, Thumbnail-Maßen, Bannergrößen und Shorts-Presets.",
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
          en: "Resize YouTube Images Online",
          vi: "Đổi kích thước ảnh YouTube online",
          de: "YouTube-Bilder online skalieren",
        })
      }
      description={
        pickText(locale, {
          en: "Resize YouTube thumbnails, Shorts images, and channel branding assets with the right YouTube image size, YouTube thumbnail size, and banner dimensions.",
          vi: "Đổi kích thước thumbnail YouTube, ảnh cho Shorts và tài sản nhận diện kênh với đúng kích thước thumbnail, banner và các thông số phù hợp.",
          de: "Skaliere YouTube-Thumbnails, Shorts-Bilder und Channel-Branding-Assets mit den richtigen Größen für Thumbnail, Banner und Shorts.",
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
            en: "Choose the image you want to prepare for a YouTube thumbnail, Shorts asset, or banner workflow.",
            vi: "Chọn ảnh bạn muốn chuẩn bị cho thumbnail YouTube, tài sản cho Shorts hoặc banner kênh.",
            de: "Wähle das Bild aus, das du für ein YouTube-Thumbnail, ein Shorts-Visual oder einen Channel-Banner vorbereiten möchtest.",
          }),
        },
        {
          title: pickText(locale, {
            en: "Pick Preset",
            vi: "Chọn preset",
            de: "Preset wählen",
          }),
          description: pickText(locale, {
            en: "Select the YouTube format you need, from thumbnail size to Shorts vertical dimensions and channel banner art.",
            vi: "Chọn đúng định dạng YouTube bạn cần, từ thumbnail đến kích thước dọc cho Shorts và banner kênh.",
            de: "Wähle das passende YouTube-Format, von Thumbnail-Größe über vertikale Shorts-Maße bis hin zu Channel-Banner-Artwork.",
          }),
        },
        {
          title: pickText(locale, {
            en: "Download",
            vi: "Tải xuống",
            de: "Herunterladen",
          }),
          description: pickText(locale, {
            en: "Export the resized image immediately so it is ready for YouTube upload or channel branding work.",
            vi: "Xuất ảnh đã đổi kích thước ngay để sẵn sàng tải lên YouTube hoặc dùng cho phần nhận diện kênh.",
            de: "Exportiere das skalierte Bild sofort, damit es für YouTube-Upload oder Channel-Branding bereit ist.",
          }),
        },
      ]}
      faqs={[
        {
          q: pickText(locale, {
            en: "What size is YouTube thumbnail?",
            vi: "Thumbnail YouTube có kích thước bao nhiêu?",
            de: "Welche Größe sollte ein YouTube-Thumbnail haben?",
          }),
          a: pickText(locale, {
            en: "YouTube Help recommends custom thumbnails at 1280 x 720 with a minimum width of 640 pixels and a 16:9 aspect ratio. That is the safest working size when you want a thumbnail that fits YouTube players and previews cleanly.",
            vi: "YouTube khuyến nghị thumbnail tùy chỉnh ở 1280 x 720 với chiều rộng tối thiểu 640 pixel và tỷ lệ 16:9. Đây là kích thước làm việc an toàn nhất khi bạn muốn thumbnail hiển thị gọn gàng trong player và preview của YouTube.",
            de: "YouTube empfiehlt benutzerdefinierte Thumbnails mit 1280 x 720, einer Mindestbreite von 640 Pixeln und einem 16:9-Seitenverhältnis. Das ist die sicherste Arbeitsgröße, wenn dein Thumbnail sauber in Playern und Vorschauen dargestellt werden soll.",
          }),
        },
        {
          q: pickText(locale, {
            en: "Why is my YouTube thumbnail blurry?",
            vi: "Vì sao thumbnail YouTube của tôi bị mờ?",
            de: "Warum ist mein YouTube-Thumbnail unscharf?",
          }),
          a: pickText(locale, {
            en: "Blurry thumbnails usually come from one of three issues: the source image is too small, the text and subject are not sharp enough before export, or the file has already been compressed too aggressively. Starting with a 1280 x 720 canvas and a clean source image usually gives better results.",
            vi: "Thumbnail bị mờ thường đến từ một trong ba nguyên nhân: ảnh nguồn quá nhỏ, phần chữ và chủ thể chưa đủ sắc trước khi xuất, hoặc tệp đã bị nén quá mạnh từ trước. Bắt đầu với canvas 1280 x 720 và ảnh nguồn sạch thường cho kết quả tốt hơn.",
            de: "Unscharfe Thumbnails entstehen meist aus drei Gründen: Die Quelle ist zu klein, Text und Motiv sind vor dem Export nicht scharf genug oder die Datei wurde bereits zu stark komprimiert. Mit einer sauberen 1280 x 720-Leinwand und einer guten Quelle erzielst du meist bessere Ergebnisse.",
          }),
        },
        {
          q: pickText(locale, {
            en: "What is YouTube banner size?",
            vi: "Kích thước banner YouTube là bao nhiêu?",
            de: "Wie groß sollte ein YouTube-Banner sein?",
          }),
          a: pickText(locale, {
            en: "YouTube Help recommends a channel banner at 2560 x 1440 pixels, with a minimum upload size of 2048 x 1152 and a central safe area for text and logos. Banner art gets cropped differently across devices, so keeping key branding in the safe area is important.",
            vi: "YouTube khuyến nghị banner kênh ở 2560 x 1440 pixel, với kích thước tải lên tối thiểu là 2048 x 1152 và một vùng an toàn ở giữa cho chữ và logo. Banner bị cắt khác nhau trên từng thiết bị, nên việc giữ nhận diện chính trong vùng an toàn là rất quan trọng.",
            de: "YouTube empfiehlt einen Channel-Banner mit 2560 x 1440 Pixeln, einer minimalen Uploadgröße von 2048 x 1152 und einer sicheren Mittelzone für Text und Logos. Banner werden je nach Gerät unterschiedlich beschnitten, daher ist es wichtig, zentrale Marken-Elemente in der Safe Area zu halten.",
          }),
        },
        {
          q: pickText(locale, {
            en: "Do I need a different size for YouTube Shorts?",
            vi: "Tôi có cần kích thước khác cho YouTube Shorts không?",
            de: "Brauche ich eine andere Größe für YouTube Shorts?",
          }),
          a: pickText(locale, {
            en: "Yes. Shorts are vertical, so 1080 x 1920 is the most practical working size when you are preparing an image or cover-style visual for Shorts-related content.",
            vi: "Có. Shorts là định dạng dọc, nên 1080 x 1920 là kích thước làm việc thực tế nhất khi bạn đang chuẩn bị hình ảnh hoặc visual kiểu cover cho nội dung liên quan đến Shorts.",
            de: "Ja. Shorts sind vertikal, daher ist 1080 x 1920 die praktischste Arbeitsgröße, wenn du ein Bild oder coverartiges Visual für Shorts-Inhalte vorbereitest.",
          }),
        },
        {
          q: pickText(locale, {
            en: "Are my files uploaded?",
            vi: "Tệp của tôi có bị tải lên không?",
            de: "Werden meine Dateien hochgeladen?",
          }),
          a: pickText(locale, {
            en: "No. This resize flow runs locally in your browser, so you can prepare YouTube assets without uploading the source image to our server.",
            vi: "Không. Quy trình resize này chạy cục bộ trong trình duyệt, nên bạn có thể chuẩn bị tài sản cho YouTube mà không cần tải ảnh nguồn lên máy chủ của chúng tôi.",
            de: "Nein. Dieser Resize-Workflow läuft lokal in deinem Browser, sodass du YouTube-Assets vorbereiten kannst, ohne die Quelle an unseren Server hochzuladen.",
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
          en: "Compress Image",
          vi: "Nén ảnh",
          de: "Bild komprimieren",
        }), path: "/compress-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-youtube"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          {
            name: pickText(locale, {
              en: "Resize for YouTube",
              vi: "Resize cho YouTube",
              de: "Für YouTube skalieren",
            }),
            url: `${siteUrl}/resize-youtube`,
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
              en: "Quick YouTube Size Guide",
              vi: "Hướng dẫn nhanh về kích thước ảnh YouTube",
              de: "Kurzanleitung zu YouTube-Bildgrößen",
            })}
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            {pickText(locale, {
              en: "If you need the key numbers fast, start here. YouTube thumbnail size is still 1280 x 720, Shorts work best in 1080 x 1920, and channel banner design should be planned around a 2560 x 1440 canvas with a safe center area.",
              vi: "Nếu bạn cần các con số quan trọng một cách nhanh chóng, hãy bắt đầu từ đây. Kích thước thumbnail YouTube vẫn là 1280 x 720, Shorts phù hợp nhất ở 1080 x 1920, còn banner kênh nên được thiết kế trên canvas 2560 x 1440 với vùng an toàn ở trung tâm.",
              de: "Wenn du die wichtigsten Zahlen schnell brauchst, starte hier. Die YouTube-Thumbnail-Größe bleibt 1280 x 720, Shorts funktionieren am besten mit 1080 x 1920, und Channel-Banner sollten auf einer 2560 x 1440-Leinwand mit sicherer Mitte geplant werden.",
            })}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "Thumbnail Size",
                vi: "Kích thước thumbnail",
                de: "Thumbnail-Größe",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "YouTube recommends 1280 x 720 with a 16:9 ratio and a minimum width of 640 pixels for custom thumbnails.",
                vi: "YouTube khuyến nghị kích thước 1280 x 720 với tỷ lệ 16:9 và chiều rộng tối thiểu 640 pixel cho thumbnail tùy chỉnh.",
                de: "YouTube empfiehlt 1280 x 720 mit 16:9-Seitenverhältnis und einer Mindestbreite von 640 Pixeln für benutzerdefinierte Thumbnails.",
              })}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "Banner Size",
                vi: "Kích thước banner",
                de: "Banner-Größe",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "Recommended banner size is 2560 x 1440. Keep important text and logos inside the safe center area because YouTube crops banners differently across devices.",
                vi: "Kích thước banner được khuyến nghị là 2560 x 1440. Hãy giữ chữ và logo quan trọng trong vùng an toàn ở giữa vì YouTube cắt banner khác nhau trên từng thiết bị.",
                de: "Die empfohlene Banner-Größe ist 2560 x 1440. Halte wichtige Texte und Logos in der sicheren Mittelzone, weil YouTube Banner je nach Gerät unterschiedlich beschneidet.",
              })}
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "Shorts Ratio",
                vi: "Tỷ lệ Shorts",
                de: "Shorts-Verhältnis",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "1080 x 1920 is the simplest vertical size for Shorts-related artwork and mobile-first YouTube assets.",
                vi: "1080 x 1920 là kích thước dọc đơn giản và thực tế nhất cho ảnh liên quan đến Shorts và các tài sản YouTube ưu tiên di động.",
                de: "1080 x 1920 ist die einfachste und praktischste vertikale Größe für Shorts-bezogene Visuals und mobile YouTube-Assets.",
              })}
            </p>
          </article>
        </div>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {pickText(locale, {
              en: "How to Resize Image for YouTube",
              vi: "Cách đổi kích thước ảnh cho YouTube",
              de: "So skalierst du Bilder für YouTube",
            })}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {pickText(locale, {
              en: "Upload the source image, choose the right YouTube preset, and export the final file. Use the thumbnail preset for standard video artwork, the Shorts preset for vertical assets, and the banner preset when you are preparing channel branding. If framing needs to change, open ",
              vi: "Tải ảnh nguồn lên, chọn preset YouTube phù hợp rồi xuất tệp cuối cùng. Dùng preset thumbnail cho ảnh video thông thường, preset Shorts cho tài sản dọc và preset banner khi bạn đang chuẩn bị hình ảnh nhận diện kênh. Nếu cần đổi bố cục, hãy mở ",
              de: "Lade dein Quellbild hoch, wähle das passende YouTube-Preset und exportiere die finale Datei. Nutze das Thumbnail-Preset für klassische Video-Grafiken, das Shorts-Preset für vertikale Assets und das Banner-Preset für Channel-Branding. Wenn das Framing angepasst werden muss, öffne zuerst ",
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
              en: "first. If the result is still too heavy, finish with ",
              vi: "trước. Nếu kết quả vẫn quá nặng, hãy hoàn tất bằng ",
              de: "zuerst. Wenn das Ergebnis danach immer noch zu schwer ist, schließe mit ",
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
              en: "before upload.",
              vi: "trước khi tải lên.",
              de: "ab, bevor du hochlädst.",
            })}
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {pickText(locale, {
              en: "Best Aspect Ratio for YouTube",
              vi: "Tỷ lệ khung hình tốt nhất cho YouTube",
              de: "Bestes Seitenverhältnis für YouTube",
            })}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {pickText(locale, {
              en: "For classic YouTube thumbnails and banner logic, 16:9 remains the strongest baseline. For Shorts, vertical 9:16 is the better match. If you cross-post visuals across multiple social channels, compare results with ",
              vi: "Với thumbnail YouTube truyền thống và logic banner, 16:9 vẫn là nền tảng mạnh nhất. Với Shorts, 9:16 dọc là lựa chọn khớp hơn. Nếu bạn đăng chéo hình ảnh qua nhiều kênh mạng xã hội, hãy so sánh kết quả với ",
              de: "Für klassische YouTube-Thumbnails und Banner-Logik bleibt 16:9 die stärkste Grundlage. Für Shorts passt vertikales 9:16 besser. Wenn du Visuals plattformübergreifend nutzt, vergleiche die Ergebnisse mit ",
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
            </Link>{" "}
            and{" "}
            <Link
              href="/resize-tiktok"
              className="font-medium text-primary hover:underline"
            >
              {pickText(locale, {
                en: "Resize TikTok",
                vi: "Đổi kích thước cho TikTok",
                de: "TikTok skalieren",
              })}
            </Link>{" "}
            {pickText(locale, {
              en: "so your workflow stays consistent across platforms.",
              vi: "để quy trình của bạn nhất quán trên các nền tảng.",
              de: "damit dein Workflow über mehrere Plattformen hinweg konsistent bleibt.",
            })}
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {pickText(locale, {
              en: "Build a Better Creator Workflow",
              vi: "Xây dựng quy trình tốt hơn cho nhà sáng tạo",
              de: "Einen besseren Creator-Workflow aufbauen",
            })}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            {pickText(locale, {
              en: "A YouTube resize tool becomes much more useful when it sits inside a broader creator stack. Prepare thumbnails here, continue into ",
              vi: "Một công cụ resize cho YouTube sẽ hữu ích hơn nhiều khi nó nằm trong một bộ công cụ rộng hơn cho nhà sáng tạo. Hãy chuẩn bị thumbnail tại đây, rồi tiếp tục sang ",
              de: "Ein YouTube-Resize-Tool wird deutlich nützlicher, wenn es Teil eines größeren Creator-Stacks ist. Bereite Thumbnails hier vor und gehe dann weiter zu ",
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
            </Link>{" "}
            {pickText(locale, {
              en: "and ",
              vi: "và ",
              de: "und ",
            })}
            <Link
              href="/resize-tiktok"
              className="font-medium text-primary hover:underline"
            >
              {pickText(locale, {
                en: "TikTok resize",
                vi: "resize cho TikTok",
                de: "TikTok-Resize",
              })}
            </Link>{" "}
            {pickText(locale, {
              en: "for distribution, then use ",
              vi: "để phân phối nội dung, sau đó dùng ",
              de: "für die Distribution und nutze anschließend ",
            })}
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
              en: "when you need lighter assets for publishing and collaboration.",
              vi: "khi bạn cần tài sản nhẹ hơn cho xuất bản và cộng tác.",
              de: "wenn du leichtere Assets für Publishing und Zusammenarbeit brauchst.",
            })}
          </p>
        </section>
      </section>
    </ToolLayout>
  );
}
