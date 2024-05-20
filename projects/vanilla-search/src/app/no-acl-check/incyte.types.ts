import { Results } from '@sinequa/core/web-services';

export interface IncyteResult extends Results {
	nonAclRecords: NonAclRecord[];
} 

export type NonAclRecord = {
    author: string,
    filename: string,
    treePath: string
}