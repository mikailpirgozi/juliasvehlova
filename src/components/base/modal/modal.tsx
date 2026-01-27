"use client";

import type { FC, ReactNode } from "react";
import {
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Heading as AriaHeading,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
    type DialogProps as AriaDialogProps,
    type DialogTriggerProps as AriaDialogTriggerProps,
    type HeadingProps as AriaHeadingProps,
    type ModalOverlayProps as AriaModalOverlayProps,
} from "react-aria-components";
import { XClose } from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { cx, sortCx } from "@/cx";

const styles = sortCx({
    overlay: [
        "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/70 p-4",
        // Animation
        "data-entering:duration-200 data-entering:ease-out data-entering:animate-in data-entering:fade-in",
        "data-exiting:duration-150 data-exiting:ease-in data-exiting:animate-out data-exiting:fade-out",
    ].join(" "),
    modal: {
        base: [
            "w-full overflow-hidden rounded-xl bg-white shadow-xl outline-hidden",
            // Animation
            "data-entering:duration-200 data-entering:ease-out data-entering:animate-in data-entering:fade-in data-entering:zoom-in-95",
            "data-exiting:duration-150 data-exiting:ease-in data-exiting:animate-out data-exiting:fade-out data-exiting:zoom-out-95",
        ].join(" "),
        sizes: {
            sm: "max-w-md",
            md: "max-w-lg",
            lg: "max-w-2xl",
            xl: "max-w-4xl",
            full: "max-w-full mx-4",
        },
    },
    header: "flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-4",
    body: "px-6 py-5",
    footer: "flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4",
    title: "text-lg font-semibold text-gray-900",
    description: "mt-1 text-sm text-gray-500",
    closeButton: [
        "flex size-9 cursor-pointer items-center justify-center rounded-lg p-2 transition duration-100 ease-linear",
        "text-gray-400 hover:bg-gray-100 hover:text-gray-500",
        "focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
    ].join(" "),
});

/* -------------------------------------------------------------------------------------------------
 * DialogTrigger
 * ----------------------------------------------------------------------------------------------- */

export interface DialogTriggerProps extends AriaDialogTriggerProps {
    children: ReactNode;
}

export const DialogTrigger = ({ children, ...props }: DialogTriggerProps) => {
    return <AriaDialogTrigger {...props}>{children}</AriaDialogTrigger>;
};

/* -------------------------------------------------------------------------------------------------
 * ModalOverlay
 * ----------------------------------------------------------------------------------------------- */

export interface ModalOverlayProps extends AriaModalOverlayProps {
    children: ReactNode;
    /** The size of the modal */
    size?: keyof typeof styles.modal.sizes;
}

export const ModalOverlay = ({ children, className, size = "md", ...props }: ModalOverlayProps) => {
    return (
        <AriaModalOverlay
            {...props}
            className={(state) => cx(styles.overlay, typeof className === "function" ? className(state) : className)}
        >
            <AriaModal
                className={(state) =>
                    cx(styles.modal.base, styles.modal.sizes[size], typeof className === "function" ? className(state) : "")
                }
            >
                {children}
            </AriaModal>
        </AriaModalOverlay>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Dialog
 * ----------------------------------------------------------------------------------------------- */

export interface DialogProps extends Omit<AriaDialogProps, "children"> {
    children: ReactNode;
    className?: string;
}

export const Dialog = ({ children, className, ...props }: DialogProps) => {
    return (
        <AriaDialog {...props} className={cx("outline-hidden", className)}>
            {children}
        </AriaDialog>
    );
};

/* -------------------------------------------------------------------------------------------------
 * DialogHeader
 * ----------------------------------------------------------------------------------------------- */

export interface DialogHeaderProps {
    children: ReactNode;
    className?: string;
    /** Whether to show the close button */
    showCloseButton?: boolean;
    /** Callback when close button is clicked */
    onClose?: () => void;
}

export const DialogHeader = ({ children, className, showCloseButton = true, onClose }: DialogHeaderProps) => {
    return (
        <div className={cx(styles.header, className)}>
            <div className="flex-1">{children}</div>
            {showCloseButton && (
                <AriaButton
                    aria-label="Zavrieť"
                    onPress={onClose}
                    className={styles.closeButton}
                >
                    <XClose aria-hidden="true" className="size-5 shrink-0" />
                </AriaButton>
            )}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * DialogTitle
 * ----------------------------------------------------------------------------------------------- */

export interface DialogTitleProps extends AriaHeadingProps {
    children: ReactNode;
}

export const DialogTitle = ({ children, className, ...props }: DialogTitleProps) => {
    return (
        <AriaHeading {...props} slot="title" className={cx(styles.title, className)}>
            {children}
        </AriaHeading>
    );
};

/* -------------------------------------------------------------------------------------------------
 * DialogDescription
 * ----------------------------------------------------------------------------------------------- */

export interface DialogDescriptionProps {
    children: ReactNode;
    className?: string;
}

export const DialogDescription = ({ children, className }: DialogDescriptionProps) => {
    return <p className={cx(styles.description, className)}>{children}</p>;
};

/* -------------------------------------------------------------------------------------------------
 * DialogBody
 * ----------------------------------------------------------------------------------------------- */

export interface DialogBodyProps {
    children: ReactNode;
    className?: string;
}

export const DialogBody = ({ children, className }: DialogBodyProps) => {
    return <div className={cx(styles.body, className)}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * DialogFooter
 * ----------------------------------------------------------------------------------------------- */

export interface DialogFooterProps {
    children: ReactNode;
    className?: string;
}

export const DialogFooter = ({ children, className }: DialogFooterProps) => {
    return <div className={cx(styles.footer, className)}>{children}</div>;
};

/* -------------------------------------------------------------------------------------------------
 * Modal (Compound Component)
 * ----------------------------------------------------------------------------------------------- */

export interface ModalProps {
    /** Whether the modal is open */
    isOpen?: boolean;
    /** Callback when the modal open state changes */
    onOpenChange?: (isOpen: boolean) => void;
    /** The trigger element */
    trigger?: ReactNode;
    /** The modal title */
    title?: string;
    /** The modal description */
    description?: string;
    /** The modal body content */
    children: ReactNode;
    /** The modal footer content */
    footer?: ReactNode;
    /** The size of the modal */
    size?: keyof typeof styles.modal.sizes;
    /** Whether clicking outside closes the modal */
    isDismissable?: boolean;
    /** Whether pressing escape closes the modal */
    isKeyboardDismissDisabled?: boolean;
    /** Custom icon component for the header */
    icon?: FC<{ className?: string }>;
    /** Color theme for the icon */
    iconColor?: "default" | "brand" | "error" | "warning" | "success";
}

export const Modal = ({
    isOpen,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    footer,
    size = "md",
    isDismissable = true,
    isKeyboardDismissDisabled = false,
}: ModalProps) => {
    const handleClose = () => {
        onOpenChange?.(false);
    };

    const content = (
        <ModalOverlay
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={isDismissable}
            isKeyboardDismissDisabled={isKeyboardDismissDisabled}
            size={size}
        >
            <Dialog>
                {(title || description) && (
                    <DialogHeader onClose={handleClose}>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                )}

                <DialogBody>{children}</DialogBody>

                {footer && <DialogFooter>{footer}</DialogFooter>}
            </Dialog>
        </ModalOverlay>
    );

    if (trigger) {
        return (
            <DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
                {trigger}
                {content}
            </DialogTrigger>
        );
    }

    return content;
};

// Export compound components
Modal.Trigger = DialogTrigger;
Modal.Overlay = ModalOverlay;
Modal.Dialog = Dialog;
Modal.Header = DialogHeader;
Modal.Title = DialogTitle;
Modal.Description = DialogDescription;
Modal.Body = DialogBody;
Modal.Footer = DialogFooter;
