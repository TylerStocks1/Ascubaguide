import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import {
  OceanMain,
  DisplayHeading,
} from "@/components/marketing/OceanChrome";

export default function NotFound() {
  return (
    <OceanMain>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-6 pt-32 text-center">
        <p className="font-display text-[120px] font-black leading-none text-white/10 md:text-[200px]">
          404
        </p>
        <DisplayHeading>
          That dive site isn&apos;t on the map.
        </DisplayHeading>
        <p className="max-w-md text-base leading-relaxed text-white/65">
          We couldn&apos;t find the page you were looking for. It may
          have moved, or never existed. Try one of these instead:
        </p>
        <ul className="space-y-3 text-base text-white/75">
          <li>
            <Link href="/" className="underline underline-offset-4 hover:text-white">
              {BUSINESS.name} home
            </Link>
          </li>
          <li>
            <Link href="/for-dive-schools" className="underline underline-offset-4 hover:text-white">
              For dive schools
            </Link>
          </li>
          <li>
            <Link href="/about" className="underline underline-offset-4 hover:text-white">
              About Blizz
            </Link>
          </li>
          <li>
            <Link href="/contact" className="underline underline-offset-4 hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </OceanMain>
  );
}
