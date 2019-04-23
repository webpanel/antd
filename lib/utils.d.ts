import * as React from 'react';
export declare const searchChildrenWithType: (children: React.ReactNode, type: React.ComponentClass<{}, any>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[];
export declare const appendStringPath: (currentPath: string, appendPath: string) => string;
