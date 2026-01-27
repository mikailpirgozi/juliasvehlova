"use client";

import type { ReactNode, Ref } from "react";
import type { InputProps as AriaInputProps, TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import { Input as AriaInput, TextField as AriaTextField } from "react-aria-components";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/cx";

interface InputBaseProps extends AriaInputProps {
    ref?: Ref<HTMLInputElement>;
}

export const InputBase = ({ className, ...props }: InputBaseProps) => {
    return (
        <AriaInput
            {...props}
            className={(state) =>
                cx(
                    "w-full rounded-lg bg-white px-3.5 py-2.5 text-md text-gray-900 shadow-xs ring-1 ring-gray-300 transition duration-100 ease-linear ring-inset placeholder:text-gray-500 autofill:rounded-lg autofill:text-gray-900 focus:outline-hidden",
                    state.isFocused && !state.isDisabled && "ring-2 ring-brand-500",
                    state.isDisabled && "cursor-not-allowed bg-gray-50 text-gray-400 ring-gray-200",
                    state.isInvalid && "ring-error_subtle",
                    state.isInvalid && state.isFocused && "ring-2 ring-error",
                    typeof className === "function" ? className(state) : className,
                )
            }
        />
    );
};

InputBase.displayName = "InputBase";

interface InputProps extends AriaTextFieldProps {
    /** Label text for the input */
    label?: string;
    /** Helper text displayed below the input */
    hint?: ReactNode;
    /** Tooltip message displayed after the label. */
    tooltip?: string;
    /** Class name for the input wrapper */
    inputClassName?: InputBaseProps["className"];
    /** Ref for the input wrapper */
    ref?: Ref<HTMLDivElement>;
    /** Ref for the input */
    inputRef?: InputBaseProps["ref"];
    /** Whether to hide required indicator from label. */
    hideRequiredIndicator?: boolean;
    /** Placeholder text. */
    placeholder?: string;
}

export const Input = ({
    label,
    hint,
    tooltip,
    inputRef,
    hideRequiredIndicator,
    inputClassName,
    placeholder,
    className,
    ...props
}: InputProps) => {
    return (
        <AriaTextField
            {...props}
            className={(state) =>
                cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
            }
        >
            {({ isInvalid, isRequired }) => (
                <>
                    {label && (
                        <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired} tooltip={tooltip}>
                            {label}
                        </Label>
                    )}

                    <InputBase placeholder={placeholder} className={inputClassName} ref={inputRef} />

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </AriaTextField>
    );
};

Input.displayName = "Input";
