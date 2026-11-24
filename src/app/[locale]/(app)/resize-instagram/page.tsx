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
        en: "Story",
        vi: "Tin",
        de: "Story",
      }),
      width: 1080,
      height: 1920,
    },
    {
      label: pickText(locale, {
        en: "Square",
        vi: "Vuông",
        de: "Quadrat",
      }),
      width: 1080,
      height: 1080,
    },
    {
      label: pickText(locale, {
        en: "Portrait",
        vi: "Dọc",
        de: "Hochformat",
      }),
      width: 1080,
      height: 1350,
    },
    {
      label: pickText(locale, {
        en: "Landscape",
        vi: "Ngang",
        de: "Querformat",
      }),
      width: 1080,
      height: 566,
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
    path: "/resize-instagram",
    title: {
      en: "Resize Instagram Images Online Free - Instagram Size Tool 2026",
      vi: "Resize ảnh Instagram online miễn phí - Công cụ kích thước Instagram 2026",
      de: "Instagram-Bilder online kostenlos skalieren - Instagram-Größentool 2026",
    },
    description: {
      en: "Resize and auto-optimize images for Instagram posts, stories, and reels to reduce blur after upload. Fast, no login, and browser-based.",
      vi: "Resize và tự động tối ưu ảnh cho bài đăng, story và reel Instagram để giảm mờ sau khi upload. Nhanh, không cần đăng nhập và chạy trên trình duyệt.",
      de: "Skaliere und optimiere Bilder für Instagram-Posts, Stories und Reels, um Unschärfe nach dem Upload zu reduzieren. Schnell, ohne Login und direkt im Browser.",
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
          en: "Resize Instagram Images Online",
          vi: "Đổi kích thước ảnh Instagram online",
          de: "Instagram-Bilder online skalieren",
        })
      }
      description={
        pickText(locale, {
          en: "Upload once, pick a format, and export IG-ready images with optional auto-optimization to reduce blur after Instagram compression.",
          vi: "Tải ảnh lên một lần, chọn đúng định dạng và xuất file tối ưu cho Instagram với tùy chọn tự động giảm mờ sau khi nền tảng nén lại.",
          de: "Einmal hochladen, Format wählen und Instagram-fertige Bilder exportieren, mit optionaler Auto-Optimierung gegen Unschärfe nach der Instagram-Komprimierung.",
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
            en: "Drop your source image and keep everything browser-side.",
            vi: "Thả ảnh nguồn vào và giữ toàn bộ quá trình xử lý ngay trên trình duyệt.",
            de: "Lade dein Quellbild hoch und halte die gesamte Verarbeitung direkt im Browser.",
          }),
        },
        {
          title: pickText(locale, {
            en: "Pick IG Format",
            vi: "Chọn định dạng Instagram",
            de: "IG-Format wählen",
          }),
          description: pickText(locale, {
            en: "Choose feed square, portrait, landscape, or story/reel output.",
            vi: "Chọn ảnh vuông cho feed, ảnh dọc, ảnh ngang hoặc đầu ra cho story/reel.",
            de: "Wähle quadratisches Feed-Format, Hochformat, Querformat oder Story-/Reel-Ausgabe.",
          }),
        },
        {
          title: pickText(locale, {
            en: "Auto Optimize",
            vi: "Tự động tối ưu",
            de: "Automatisch optimieren",
          }),
          description: pickText(locale, {
            en: "Enable Instagram Optimization Engine to tune JPEG output for IG recompression.",
            vi: "Bật công cụ tối ưu Instagram để tinh chỉnh JPEG phù hợp hơn với việc Instagram nén lại.",
            de: "Aktiviere die Instagram-Optimierung, um JPEG-Ausgaben besser auf die erneute Instagram-Komprimierung abzustimmen.",
          }),
        },
        {
          title: pickText(locale, {
            en: "Download and Publish",
            vi: "Tải xuống và đăng",
            de: "Herunterladen und veröffentlichen",
          }),
          description: pickText(locale, {
            en: "Export the final file and post with less quality loss.",
            vi: "Xuất tệp cuối cùng và đăng với ít suy giảm chất lượng hơn.",
            de: "Exportiere die finale Datei und veröffentliche sie mit weniger Qualitätsverlust.",
          }),
        },
      ]}
      faqs={[
        {
          q: pickText(locale, {
            en: "Why do Instagram images look blurry even when the original looks sharp?",
            vi: "Vì sao ảnh Instagram bị mờ dù ảnh gốc vẫn sắc nét?",
            de: "Warum wirken Instagram-Bilder unscharf, obwohl das Original scharf ist?",
          }),
          a: pickText(locale, {
            en: "Instagram recompresses uploaded media. If your file dimensions, format, or quality are not aligned to common Instagram outputs, IG may downscale and recompress aggressively, which can introduce softness and artifacts.",
            vi: "Instagram sẽ nén lại nội dung bạn tải lên. Nếu kích thước, định dạng hoặc chất lượng tệp không khớp với đầu ra phổ biến của Instagram, nền tảng có thể giảm kích thước và nén mạnh tay hơn, gây mềm ảnh và xuất hiện lỗi nén.",
            de: "Instagram komprimiert hochgeladene Medien erneut. Wenn Dateimaße, Format oder Qualität nicht zu typischen Instagram-Ausgaben passen, kann die Plattform aggressiver verkleinern und recomprimieren, was zu Unschärfe und Artefakten führt.",
          })
        },
        {
          q: pickText(locale, {
            en: "Do you crop or stretch my image?",
            vi: "Công cụ sẽ crop hay kéo giãn ảnh của tôi?",
            de: "Wird mein Bild zugeschnitten oder gestreckt?",
          }),
          a: pickText(locale, {
            en: "This flow is crop-first. When you choose a preset, the crop guide locks to that Instagram ratio so you can reframe the image before export. The tool then crops and resizes to the exact target dimensions.",
            vi: "Quy trình này ưu tiên crop trước. Khi bạn chọn preset, khung crop sẽ khóa theo đúng tỷ lệ Instagram đó để bạn có thể căn lại bố cục trước khi xuất. Sau đó công cụ sẽ crop và resize đúng theo kích thước mục tiêu.",
            de: "Dieser Workflow arbeitet zuerst mit Zuschnitt. Wenn du ein Preset wählst, wird die Crop-Fläche auf das passende Instagram-Seitenverhältnis gesperrt, damit du die Komposition vor dem Export anpassen kannst. Danach wird exakt auf das Zielmaß zugeschnitten und skaliert.",
          })
        },
        {
          q: pickText(locale, {
            en: "Are my files uploaded to a server?",
            vi: "Tệp của tôi có bị tải lên máy chủ không?",
            de: "Werden meine Dateien auf einen Server hochgeladen?",
          }),
          a: pickText(locale, {
            en: "No for this flow. Instagram resize runs locally in your browser using our image worker, which keeps processing fast and private without requiring login.",
            vi: "Không với quy trình này. Resize cho Instagram chạy cục bộ trong trình duyệt bằng image worker, nên vừa nhanh vừa riêng tư mà không cần đăng nhập.",
            de: "Nein, nicht bei diesem Workflow. Das Instagram-Resize läuft lokal in deinem Browser mit unserem Image Worker, dadurch bleibt es schnell und privat ganz ohne Login.",
          })
        },
        {
          q: pickText(locale, {
            en: "1080 vs 2048 on Instagram: which one should I use?",
            vi: "Trên Instagram nên dùng 1080 hay 2048?",
            de: "Sollte ich auf Instagram 1080 oder 2048 verwenden?",
          }),
          a: pickText(locale, {
            en: "For most workflows, 1080-based outputs are reliable and efficient. Larger exports can still be recompressed by Instagram and do not always produce visibly better results after upload.",
            vi: "Với phần lớn quy trình, đầu ra dựa trên chuẩn 1080 vẫn đáng tin cậy và hiệu quả. Tệp lớn hơn vẫn có thể bị Instagram nén lại và không phải lúc nào cũng cho kết quả nhìn thấy tốt hơn sau khi tải lên.",
            de: "Für die meisten Workflows bleiben 1080-basierte Ausgaben zuverlässig und effizient. Größere Exporte können von Instagram trotzdem erneut komprimiert werden und liefern nach dem Upload nicht immer sichtbar bessere Ergebnisse.",
          })
        }
      ]}
      relatedTools={[
        { name: pickText(locale, {
          en: "Resize Image",
          vi: "Đổi kích thước ảnh",
          de: "Bildgröße ändern",
        }), path: "/resize-image" },
        { name: pickText(locale, {
          en: "Crop Image",
          vi: "Cắt ảnh",
          de: "Bild zuschneiden",
        }), path: "/crop-image" },
        { name: pickText(locale, {
          en: "Compress Image",
          vi: "Nén ảnh",
          de: "Bild komprimieren",
        }), path: "/compress-image" },
        { name: pickText(locale, {
          en: "Upscale Image",
          vi: "Tăng độ phân giải ảnh",
          de: "Bild hochskalieren",
        }), path: "/upscale-image" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-instagram"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          {
            name: pickText(locale, {
              en: "Resize for Instagram",
              vi: "Resize cho Instagram",
              de: "Für Instagram skalieren",
            }),
            url: `${siteUrl}/resize-instagram`,
          },
        ]}
      />
      <SocialResizeClient
        presets={getPresets(locale)}
        defaultPresetIndex={0}
        instagramOptimization
      />

      <ToolNextActions
        className="mt-10"
        title={nextActions.title}
        description={nextActions.description}
        items={nextActions.items}
      />

      <section className="mt-24 space-y-8 bg-card">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            {pickText(locale, {
              en: "Why Instagram quality drops after upload",
              vi: "Vì sao chất lượng ảnh Instagram giảm sau khi tải lên",
              de: "Warum die Instagram-Qualität nach dem Upload sinkt",
            })}
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            {pickText(locale, {
              en: "Instagram does not keep your original export untouched. It may resize, recompress, and re-encode based on placement and device context. The safest workflow is to pre-fit dimensions, keep clean composition, and use upload-ready compression before posting.",
              vi: "Instagram không giữ nguyên hoàn toàn tệp bạn xuất ra. Nền tảng có thể đổi kích thước, nén lại và mã hóa lại tùy theo vị trí hiển thị và thiết bị. Quy trình an toàn nhất là chuẩn hóa kích thước trước, giữ bố cục sạch và dùng mức nén phù hợp trước khi đăng.",
              de: "Instagram lässt deine exportierte Datei nicht unverändert. Die Plattform kann je nach Platzierung und Gerät neu skalieren, recomprimieren und neu encodieren. Am sichersten ist es, die Maße vorab anzupassen, die Komposition sauber zu halten und uploadfähige Komprimierung zu nutzen.",
            })}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-background p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "Best export settings before upload",
                vi: "Thiết lập xuất ảnh tốt nhất trước khi tải lên",
                de: "Beste Exporteinstellungen vor dem Upload",
              })}
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>
                {pickText(locale, {
                  en: "Use exact target dimensions (1080x1080, 1080x1350, 1080x1920).",
                  vi: "Dùng đúng kích thước mục tiêu như 1080x1080, 1080x1350 hoặc 1080x1920.",
                  de: "Verwende exakte Zielmaße wie 1080x1080, 1080x1350 oder 1080x1920.",
                })}
              </li>
              <li>
                {pickText(locale, {
                  en: "Prefer JPEG for photo content to avoid oversized files.",
                  vi: "Ưu tiên JPEG cho ảnh chụp để tránh tệp quá nặng.",
                  de: "Bevorzuge JPEG für Fotoinhalte, um übergroße Dateien zu vermeiden.",
                })}
              </li>
              <li>
                {pickText(locale, {
                  en: "Apply moderate sharpening before export for mobile viewing.",
                  vi: "Làm nét vừa phải trước khi xuất để tối ưu hiển thị trên di động.",
                  de: "Schärfe moderat vor dem Export nach, um die mobile Darstellung zu verbessern.",
                })}
              </li>
              <li>
                {pickText(locale, {
                  en: "Keep file size practical to reduce aggressive server recompression.",
                  vi: "Giữ dung lượng ở mức hợp lý để giảm nguy cơ bị máy chủ nén lại quá mạnh.",
                  de: "Halte die Dateigröße praxisnah, um aggressive Server-Rekomprimierung zu reduzieren.",
                })}
              </li>
            </ul>
          </article>

          <article className="rounded-xl border border-border bg-background p-5">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "1080 vs 2048 myth",
                vi: "Hiểu lầm 1080 so với 2048",
                de: "1080-vs-2048-Mythos",
              })}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "Exporting bigger does not always win. In many cases, Instagram still recompresses toward platform-friendly outputs. A clean 1080-based file with balanced compression often looks better than an oversized upload that gets heavily recompressed.",
                vi: "Xuất ảnh lớn hơn không phải lúc nào cũng tốt hơn. Trong nhiều trường hợp, Instagram vẫn nén lại về đầu ra phù hợp với nền tảng. Một tệp sạch dựa trên chuẩn 1080 với mức nén cân bằng thường đẹp hơn một tệp quá lớn rồi bị nén rất mạnh.",
                de: "Größer zu exportieren gewinnt nicht immer. In vielen Fällen komprimiert Instagram trotzdem auf plattformgerechte Ausgaben zurück. Eine saubere 1080-basierte Datei mit ausgewogener Komprimierung sieht oft besser aus als ein übergroßer Upload, der danach stark neu komprimiert wird.",
              })}
            </p>
          </article>
        </div>

        <div className="grid gap-4 rounded-xl border border-border bg-background p-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">
              {pickText(locale, {
                en: "Need more than one-off resize?",
                vi: "Cần nhiều hơn một lần đổi kích thước đơn lẻ?",
                de: "Mehr als nur ein einmaliges Resize?",
              })}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pickText(locale, {
                en: "For teams and power users, continue with batch-focused flows and advanced tool chains. You can also expand to quality recovery before resize when source assets are low resolution.",
                vi: "Với team hoặc người dùng nâng cao, bạn có thể tiếp tục sang các quy trình theo lô và chuỗi công cụ nâng cao. Bạn cũng có thể phục hồi chất lượng trước khi đổi kích thước nếu ảnh nguồn có độ phân giải thấp.",
                de: "Für Teams und Power-User lohnen sich batchorientierte Abläufe und erweiterte Tool-Ketten. Du kannst auch vor dem Resize eine Qualitätswiederherstellung einsetzen, wenn die Quelle niedrig aufgelöst ist.",
              })}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/compress-image"
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:opacity-95"
            >
              {pickText(locale, {
                en: "Open Batch Compress",
                vi: "Mở công cụ nén hàng loạt",
                de: "Batch-Komprimierung öffnen",
              })}
            </Link>
            <Link
              href="/upscale-image"
              className="rounded-lg border border-border bg-card px-4 py-2.5 text-center text-sm font-semibold text-foreground hover:bg-secondary"
            >
              {pickText(locale, {
                en: "Improve Source Quality",
                vi: "Cải thiện chất lượng ảnh nguồn",
                de: "Quellbild verbessern",
              })}
            </Link>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
