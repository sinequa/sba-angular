import { CCWebService } from "./CCWebService";

/**
 * Describes the fields in the labels web service configuration object
 */


export interface CCLabels extends CCWebService {
    /**
     * The the index column to use for public labels
     */
    publicLabelsField: string;
    /**
     * A semi-colon separated list of predefined public labels
     */
    defaultPublicLabels: string;
    /**
     * Determines whether new public labels can be created by users
     */
    allowPublicLabelsCreation: boolean;
    /**
     * A list of principal ids identifying users and groups that can create public labels
     */
    publicLabelsCreationPrincipalIds: string;
    /**
     * Determines whether existing public labels can be modified by users
     */
    allowPublicLabelsModification: boolean;
    /**
     * A list of principal ids identifying users and groups that can modify existing public labels
     */
    publicLabelsModificationPrincipalIds: string;

    /**
     * The the index column to use for private labels
     */
    privateLabelsField: string;

    /**
     * The maximum number of labels to return when listing labels using the [LabelsWebService.list]{@link LabelsWebService#list} api
     */
    labelsAutoSuggestMaxCount: number;

    /**
     * The wildcard character to recognize when listing labels using the [LabelsWebService.list]{@link LabelsWebService#list} api
     */
    labelsAutoSuggestWildcard: string;
}
