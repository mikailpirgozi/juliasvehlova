"use client";

import type { ReactNode, Ref } from "react";
import { createContext, forwardRef, useContext } from "react";
import {
    Button as AriaButton,
    Disclosure as AriaDisclosure,
    DisclosureGroup as AriaDisclosureGroup,
    DisclosurePanel as AriaDisclosurePanel,
    Heading as AriaHeading,
    type DisclosureGroupProps as AriaDisclosureGroupProps,
    type DisclosureProps as AriaDisclosureProps,
} from "react-aria-components";
import { ChevronDown, MinusCircle, PlusCircle } from "@untitledui/icons";
import { cx, sortCx } from "@/cx";

const styles = sortCx({
    group: "flex flex-col",
    item: {
        base: "group border-b border-gray-200 last:border-b-0",
        variants: {
            default: "",
            card: "rounded-xl border border-gray-200 bg-white shadow-xs mb-3 last:mb-0",
        },
    },
    trigger: {
        base: [
            "flex w-full cursor-pointer items-center justify-between gap-4 text-left transition duration-100 ease-linear",
            "focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
            "hover:bg-gray-50",
        ].join(" "),
        variants: {
            default: "py-5",
            card: "p-5 rounded-xl",
        },
    },
    triggerContent: "flex flex-1 flex-col gap-1",
    title: "text-md font-semibold text-gray-900 group-data-[expanded]:text-brand-700",
    subtitle: "text-sm text-gray-500",
    icon: {
        base: "size-5 shrink-0 text-gray-400 transition-transform duration-200",
        chevron: "group-data-[expanded]:rotate-180",
        plusMinus: "",
    },
    panel: {
        base: "overflow-hidden transition-all duration-200",
        variants: {
            default: "pb-5",
            card: "px-5 pb-5",
        },
    },
    content: "text-md text-gray-500",
});

/* -------------------------------------------------------------------------------------------------
 * Context
 * ----------------------------------------------------------------------------------------------- */

interface AccordionContextValue {
    variant: "default" | "card";
    iconStyle: "chevron" | "plus-minus";
}

const AccordionContext = createContext<AccordionContextValue>({
    variant: "default",
    iconStyle: "chevron",
});

const useAccordionContext = () => useContext(AccordionContext);

/* -------------------------------------------------------------------------------------------------
 * AccordionGroup
 * ----------------------------------------------------------------------------------------------- */

export interface AccordionGroupProps extends Omit<AriaDisclosureGroupProps, "children"> {
    children: ReactNode;
    /** Visual variant of the accordion */
    variant?: "default" | "card";
    /** Icon style for expand/collapse indicator */
    iconStyle?: "chevron" | "plus-minus";
    /** Additional class name */
    className?: string;
}

export const AccordionGroup = forwardRef(function AccordionGroup(
    { children, variant = "default", iconStyle = "chevron", className, ...props }: AccordionGroupProps,
    ref: Ref<HTMLDivElement>
) {
    return (
        <AccordionContext.Provider value={{ variant, iconStyle }}>
            <AriaDisclosureGroup
                {...props}
                ref={ref}
                className={cx(styles.group, className)}
            >
                {children}
            </AriaDisclosureGroup>
        </AccordionContext.Provider>
    );
});

/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * ----------------------------------------------------------------------------------------------- */

export interface AccordionItemProps extends Omit<AriaDisclosureProps, "className"> {
    children: ReactNode;
    className?: string;
}

export const AccordionItem = forwardRef(function AccordionItem(
    { children, className, ...props }: AccordionItemProps,
    ref: Ref<HTMLDivElement>
) {
    const { variant } = useAccordionContext();

    return (
        <AriaDisclosure
            {...props}
            ref={ref}
            className={cx(styles.item.base, styles.item.variants[variant], className)}
        >
            {children}
        </AriaDisclosure>
    );
});

/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * ----------------------------------------------------------------------------------------------- */

export interface AccordionTriggerProps {
    children: ReactNode;
    /** Subtitle text displayed below the title */
    subtitle?: string;
    className?: string;
}

export const AccordionTrigger = ({ children, subtitle, className }: AccordionTriggerProps) => {
    const { variant, iconStyle } = useAccordionContext();

    return (
        <AriaHeading>
            <AriaButton
                slot="trigger"
                className={cx(styles.trigger.base, styles.trigger.variants[variant], className)}
            >
                <div className={styles.triggerContent}>
                    <span className={styles.title}>{children}</span>
                    {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
                </div>

                {iconStyle === "chevron" ? (
                    <ChevronDown className={cx(styles.icon.base, styles.icon.chevron)} aria-hidden="true" />
                ) : (
                    <>
                        <PlusCircle className={cx(styles.icon.base, "group-data-[expanded]:hidden")} aria-hidden="true" />
                        <MinusCircle className={cx(styles.icon.base, "hidden group-data-[expanded]:block")} aria-hidden="true" />
                    </>
                )}
            </AriaButton>
        </AriaHeading>
    );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionContent
 * ----------------------------------------------------------------------------------------------- */

export interface AccordionContentProps {
    children: ReactNode;
    className?: string;
}

export const AccordionContent = ({ children, className }: AccordionContentProps) => {
    const { variant } = useAccordionContext();

    return (
        <AriaDisclosurePanel className={cx(styles.panel.base, styles.panel.variants[variant])}>
            <div className={cx(styles.content, className)}>{children}</div>
        </AriaDisclosurePanel>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Accordion (Compound Component)
 * ----------------------------------------------------------------------------------------------- */

export interface AccordionProps {
    /** Array of accordion items */
    items: Array<{
        id: string;
        title: string;
        subtitle?: string;
        content: ReactNode;
    }>;
    /** Visual variant of the accordion */
    variant?: "default" | "card";
    /** Icon style for expand/collapse indicator */
    iconStyle?: "chevron" | "plus-minus";
    /** Whether to allow multiple items to be expanded at once */
    allowsMultipleExpanded?: boolean;
    /** IDs of initially expanded items */
    defaultExpandedKeys?: string[];
    /** Additional class name */
    className?: string;
}

export const Accordion = ({
    items,
    variant = "default",
    iconStyle = "chevron",
    allowsMultipleExpanded = false,
    defaultExpandedKeys,
    className,
}: AccordionProps) => {
    return (
        <AccordionGroup
            variant={variant}
            iconStyle={iconStyle}
            allowsMultipleExpanded={allowsMultipleExpanded}
            defaultExpandedKeys={defaultExpandedKeys}
            className={className}
        >
            {items.map((item) => (
                <AccordionItem key={item.id} id={item.id}>
                    <AccordionTrigger subtitle={item.subtitle}>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </AccordionGroup>
    );
};

// Export compound components
Accordion.Group = AccordionGroup;
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
