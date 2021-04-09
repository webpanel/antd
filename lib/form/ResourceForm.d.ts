import * as React from "react";
import { FormInstance, FormProps } from "antd/lib/form/Form";
import { Resource } from "webpanel-data";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
export interface ResourceFormProps extends FormProps {
    formResource: Resource;
    onSuccess?: () => void;
    onFailure?: (validationError: ValidateErrorEntity) => void;
    onValuesChange?: (values: any) => void;
    formRef?: React.MutableRefObject<FormInstance | null>;
}
export declare const ResourceForm: (props: ResourceFormProps) => JSX.Element;
