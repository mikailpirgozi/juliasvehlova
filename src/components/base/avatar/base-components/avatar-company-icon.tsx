"use client";

import Image from "next/image";
import { cx } from "@/cx";

const sizes = {
    xs: "size-2",
    sm: "size-3",
    md: "size-3.5",
    lg: "size-4",
    xl: "size-4.5",
    "2xl": "size-5 ring-[1.67px]",
};

interface AvatarCompanyIconProps {
    size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    src: string;
    alt?: string;
}

export const AvatarCompanyIcon = ({ size, src, alt }: AvatarCompanyIconProps) => (
    <Image
        src={src}
        alt={alt || "Company icon"}
        width={20}
        height={20}
        className={cx("bg-primary-25 absolute -right-0.5 -bottom-0.5 rounded-full object-cover ring-[1.5px] ring-bg-primary", sizes[size])}
    />
);
