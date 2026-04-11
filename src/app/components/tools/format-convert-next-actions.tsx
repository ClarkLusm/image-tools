import ToolNextActions from "@/app/components/tools/tool-next-actions";
import { resolveSupportedLanguage } from "@/app/lib/metadata";
import { getToolNextActions } from "@/app/lib/tool-next-actions";
import type { ComponentProps } from "react";

type FormatConvertTask = "convert-to-png" | "convert-to-jpg" | "convert-to-webp";

type FormatConvertNextActionsProps = {
  locale: string;
  task: FormatConvertTask;
  className?: ComponentProps<typeof ToolNextActions>["className"];
};

export default function FormatConvertNextActions({
  locale,
  task,
  className,
}: FormatConvertNextActionsProps) {
  const languageCode = resolveSupportedLanguage(locale);
  const nextActions = getToolNextActions(task, languageCode);

  return <ToolNextActions {...nextActions} className={className} />;
}
