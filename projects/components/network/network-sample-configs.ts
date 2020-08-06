import { ProviderFactory } from './providers/provider-factory';
import { NetworkProvider } from './network-models';
import { Record } from '@sinequa/core/web-services';
import { SearchService } from '@sinequa/components/search';
import { RecordNode } from './providers/records-provider';
import { Node } from './network-models';
import { DynamicEdgeType } from './providers/dynamic-edge-provider';

/**
 * Creates a network from a list of records, with record and person nodes.
 * The person nodes are attached to a record if that record contains them.
 * @param providerFactory The provider factory
 * @param records A given list of records
 */
export function recordsProviderDemo(providerFactory: ProviderFactory, records: Record[]): NetworkProvider[] {
  
  const doc = providerFactory.createRecordNodeType();
  const person = providerFactory.createPersonNodeType();

  const struct = providerFactory.createStructuralEdgeTypes(doc, [person], "oninsert", "all");

  const provider = providerFactory.createRecordsProvider(doc, struct, records);
  return [provider];
}

/**
 * Creates a network from the selected records, with record and person nodes.
 * The person nodes are attached to a record if that record contains them.
 * The network is refreshed every time documents are selected or unselected.
 * @param providerFactory The provider factory
 */
export function selectedRecordsProviderDemo(providerFactory: ProviderFactory): NetworkProvider[] {
  
  const doc = providerFactory.createRecordNodeType();
  const person = providerFactory.createPersonNodeType();

  const struct = providerFactory.createStructuralEdgeTypes(doc, [person], "oninsert", "all");

  const provider = providerFactory.createSelectedRecordsProvider(doc, struct);
  return [provider];
}

/**
 * Creates a network for a list of records fetched with a query. The query
 * specifically returns 5 wikipedia documents about "human" and containing the text "google".
 * The record nodes are rendered with the wikipedia thumbnail rather than a generic icon.
 * @param providerFactory The provider factory
 * @param searchService The search service
 */
export function asyncRecordsProviderDemo(providerFactory: ProviderFactory, searchService: SearchService): NetworkProvider[] {
  
  const doc = providerFactory.createNodeType("doc", 
    providerFactory.createDynamicImageNodeOptions(
      (node: Node) => (node as RecordNode).record['sourcevarchar4'] || ""
    )
  );

  const query = searchService.makeQuery();
  query.text = "google";
  query.addSelect("treepath:=/Web/Wiki/");
  query.addSelect("sourcestr4:=human");
  query.pageSize = 5;

  const provider = providerFactory.createAsyncRecordsProvider(doc, [], query);
  return [provider];
}

/**
 * Creates a network from a cross-aggregation between person and company entities.
 * @param providerFactory The provider factory
 */
export function crossAggregationDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();

  const edge = providerFactory.createAggregationEdgeType([company, person], "Company_Person")

  const provider = providerFactory.createAggregationProvider([edge]);

  return [provider];
}

/**
 * Creates a network from a cross-aggregation between person and company entities.
 * Additionally, the company and person nodes can be expanded to other company, person
 * and geo entities.
 * @param providerFactory The provider factory
 */
export function crossAggregationExpandDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();
  const geo = providerFactory.createGeoNodeType();

  const edge = providerFactory.createAggregationEdgeType([company, person], "Company_Person");
  const expandCompany = providerFactory.createAggregationEdgeType([company, person], "person", undefined, "onclick");
  const expandPersonCompany = providerFactory.createAggregationEdgeType([person, company], "company", undefined, "manual");
  const expandPersonGeo = providerFactory.createAggregationEdgeType([person, geo], "geo", undefined, "manual");

  const provider = providerFactory.createAggregationProvider([edge, expandCompany, expandPersonCompany, expandPersonGeo]);

  return [provider];
}

/**
 * Creates a network from a cooccurrence distribution between person and company
 * entities.
 * @param providerFactory The provider factory
 */
export function coocAggregationDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();

  const edge = providerFactory.createCoocAggregationEdgeType([company, person], "Company_Person_Cooc")

  const provider = providerFactory.createAggregationProvider([edge]);

  return [provider];
}

/**
 * Creates a network from a triple-cooccurrence between person, companies and in-between
 * a "job" entity ('(BILL GATES)#(CEO)#(MICROSOFT)').
 * @param providerFactory The provider factory
 */
export function typedCoocAggregationDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();

  const edge = providerFactory.createTypedCoocAggregationEdgeType([person, company], "Person_Job_Company_Cooc")

  const provider = providerFactory.createAggregationProvider([edge]);

  return [provider];
}

/**
 * Creates a network from the list of selected records and displays the cooccurrence entities
 * contained in these records. The record nodes themselves are actually hidden (hideRecordNode=true).
 * The cooccurrence entities are each displayed as two nodes linked by an edge.
 * @param providerFactory The provider factory
 */
export function coocRecordDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const doc = providerFactory.createRecordNodeType();
  const job = providerFactory.createCompanyNodeType();
  const person = providerFactory.createPersonNodeType();

  const struct = providerFactory.createCoocStructuralEdgeTypes(doc, [job, person], "person_cooc", "oninsert", "all");

  const provider = providerFactory.createSelectedRecordsProvider(doc, [struct], true);
  
  return [provider];
}

/**
 * Creates a network from the list of selected records and displays the triple-cooccurrence entities
 * between person, companies and in-between a "job" entity ('(BILL GATES)#(CEO)#(MICROSOFT)') contained
 * in these records.
 * The cooccurrence entities are each displayed as two nodes linked by a typed edge (with a label showing the "job").
 * @param providerFactory The provider factory
 */
export function typedCoocRecordDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const doc = providerFactory.createRecordNodeType();
  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();

  const struct = providerFactory.createTypedCoocStructuralEdgeTypes(doc, [person, company], "person_job_company", "oninsert", "all");

  const provider = providerFactory.createSelectedRecordsProvider(doc, [struct]);
  
  return [provider];
}

/**
 * Creates a network from the list of selected record and three cross-distributions between geo, 
 * person and company entities.
 * Additionally, the metadata nodes are expandable to other metadata nodes, via cross-distributions.
 * @param providerFactory The provider factory
 */
export function oOTBConfig(providerFactory: ProviderFactory): NetworkProvider[] {

  // Create the node types for standard entities
  const geo = providerFactory.createGeoNodeType();
  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();

  // Create the node type for generic documents
  const docNode = providerFactory.createRecordNodeType();

  // Create structural edges from the document nodes to the standard entities
  const structEdges = providerFactory.createStructuralEdgeTypes(docNode, [geo, person, company]);
  
  // Create aggregation edges to link standard entities together (The 3 aggregations are not standard and must be configured on the server)
  const geo_person = providerFactory.createAggregationEdgeType([geo, person], "Geo_Person");
  const company_person = providerFactory.createAggregationEdgeType([company, person], "Company_Person");
  const geo_company = providerFactory.createAggregationEdgeType([geo, company], "Geo_Company");
  
  const expandEdges = providerFactory.createAllExpansionEdgeTypes([geo, person, company], ["Geo", "Person", "Company"], true);

  // Return list of providers
  return [
    providerFactory.createSelectedRecordsProvider(docNode, structEdges),
    providerFactory.createAggregationProvider([geo_person, company_person, geo_company, ...expandEdges])
  ];

}

/**
 * Creates a network from a list of records fetched via a query asynchronously, and cross-distributions
 * between the geo, company and person nodes.
 * The query specifically asks for 3 wikipedia documents about "Barack Obama".
 * The network will contain relations between the records and the metadata displayed among the aggregation
 * edges.
 * @param providerFactory The provider factory
 * @param searchService The search service
 */
export function wikiAsyncConfig(providerFactory: ProviderFactory, searchService: SearchService): NetworkProvider[] {
  
  // Create the node types for standard entities
  const geo = providerFactory.createGeoNodeType();
  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();

  // Create the node type for generic documents
  const docNode = providerFactory.createRecordNodeType();

  // Create structural edges from the document nodes to the standard entities
  const structEdges = providerFactory.createStructuralEdgeTypes(docNode, [geo, person, company], "oninsert", "existingnodes");
  
  // Create aggregation edges to link standard entities together (The 3 aggregations are not standard and must be configured on the server)
  const geo_person = providerFactory.createAggregationEdgeType([geo, person], "Geo_Person");
  const company_person = providerFactory.createAggregationEdgeType([company, person], "Company_Person");
  const geo_company = providerFactory.createAggregationEdgeType([geo, company], "Geo_Company");
 
  // Create a query to retrieve the list of records
  const query = searchService.makeQuery();
  query.text = "Barack Obama";
  query.addSelect("treepath:=/Web/Wiki/");
  query.pageSize = 3;

  // Return list of providers
  return [
    providerFactory.createAsyncRecordsProvider(docNode, structEdges, query),
    providerFactory.createAggregationProvider([geo_person, company_person, geo_company])
  ];

}


/**
 * Creates a network from the list of selected records. Additionally, when these records
 * are inserted, fetches additional records from the server, which gets attached to the record
 * nodes ("dynamic edges"). Specifically these new records are 5 wikipedia articles about humans
 * and talking about whatever the original node's label is. (if the original node is "Microsoft",
 * the dynamic edges will likely include Bill Gates, Steve Ballmer, Paul Allen, etc.)
 * The nodes of these new records (with the "people" type) are displayed with the wikipedia thumbnail.
 * Additionally we display the company entities contained in these people nodes (structural edges).
 * @param providerFactory The provider factory
 * @param searchService The search service
 */
export function wikiDynEdgeConfig(providerFactory: ProviderFactory, searchService: SearchService): NetworkProvider[] {
  // Create a standard document node type
  const doc = providerFactory.createRecordNodeType();
  const company = providerFactory.createCompanyNodeType();

  // Create a node type of people, displaying the image of that person instead of a generic icon
  const people = providerFactory.createNodeType("person",
    providerFactory.createDynamicImageNodeOptions(
      (node: Node) => (node as RecordNode).record['sourcevarchar4'] || ""
    )
  );

  // Create a standard provider for records
  const recordProvider = providerFactory.createSelectedRecordsProvider(doc, []);

  // Create a dynamic edge type, that creates a query to fetch people related to that document
  const dynamicEdgeType = providerFactory.createDynamicEdgeType([doc, people], "oninsert",
    (node: Node, type: DynamicEdgeType) => {
      const query = searchService.makeQuery();
      query.text = node.label;
      query.addSelect("treepath:=/Web/Wiki/");
      query.addSelect("sourcestr4:=human");
      query.pageSize = 5;
      return query;
    });

  // Create a structural edge type for link companies to people
  const struct = providerFactory.createStructuralEdgeTypes(people, [company]);

  // Create a dynamic edge provider to create the dynamic edges whose type we just defined
  const peopleProvider = providerFactory.createDynamicEdgeProvider(dynamicEdgeType, struct, true, "People", [recordProvider]);

  // Return the two providers
  return [recordProvider, peopleProvider];
}

/**
 * Creates a network from cross distribution between Company and Person entities.
 * Additionally, the person nodes are "dynamic nodes", meaning they become enriched (when clicked on,
 * by default) with a record fetched from the server. When this happens, the display of the node
 * changes (in this case we display the wikipedia thumbnail of that person, instead of a generic icon),
 * and "structural edges" are added to the nodes (in this case we display the "company" entities
 * contained in the wikipedia pages of the person).
 * @param providerFactory The provider factory
 * @param searchService The search service
 */
export function wikiDynConfig(providerFactory: ProviderFactory, searchService: SearchService): NetworkProvider[] {
  
  // Create the node types for the company and person entities
  const company = providerFactory.createCompanyNodeType();
  const person = providerFactory.makeNodeTypeDynamic(
    // By default, the node is a standard person node
    providerFactory.createPersonNodeType(),
    // This function returns the query necessary to transform the node
    (node: Node) => {
      let query = searchService.makeQuery();
      query.text = node.label;
      query.addSelect("treepath:=/Web/Wiki/");
      query.addSelect("sourcestr4:=human");
      query.pageSize = 1;
      return query
    },
    // The node options to use after the node has been transformed (displaying an image instead of an icon)
    providerFactory.createDynamicImageNodeOptions(
      (node: Node) => (node as RecordNode).record['sourcevarchar4'] || ""
    )
  );

  // Create aggregation edges to link companies and people
  const company_person = providerFactory.createAggregationEdgeType([company, person], "Company_Person");

  // Create the aggregation provider
  const aggProvider = providerFactory.createAggregationProvider([company_person]);

  // Create structural edges from the document nodes to the person and company entities
  const structEdges = providerFactory.createStructuralEdgeTypes(person, [company, person], "oninsert", "paginate");

  // Create the dynamic node provider
  const personProvider = providerFactory.createDynamicNodeProvider(person, structEdges, true, "People", [aggProvider]);

  return [aggProvider, personProvider];
}

/**
 * Creates a network from 3 cross distribution between Company, Geo and Person entities.
 * Additionally, the person nodes are "dynamic nodes", meaning they become enriched (when inserted) 
 * with a record fetched from the server. When this happens, the display of the node
 * changes (in this case we display the wikipedia thumbnail of that person, instead of a generic icon).
 * Additionally, the company nodes are manually expandable to display relations with other people nodes.
 * @param providerFactory The provider factory
 * @param searchService The search service
 */
export function wikiMultiDynConfig(providerFactory: ProviderFactory, searchService: SearchService): NetworkProvider[] {
  
  // Create the node types for standard entities
  
  // geo and company are a normal node types
  const geo = providerFactory.createGeoNodeType();
  const company = providerFactory.createCompanyNodeType();

  // person is dynamic node type
  const person = providerFactory.makeNodeTypeDynamic(
    // it is initialized from a standard person node type
    providerFactory.createPersonNodeType(),
    // a function that returns a query to retrieve the wikipedia page of this person
    (node: Node) => {
      let query = searchService.makeQuery();
      query.text = node.label;
      query.addSelect("treepath:=/Web/Wiki/");
      query.addSelect("sourcestr4:=human");
      query.pageSize = 1;
      return query
    },
    // the node options used when the node has been mutated (sourcevarchar4 contains the wikipedia image URL)
    providerFactory.createDynamicImageNodeOptions(
      (node: Node) => (node as RecordNode).record['sourcevarchar4'] || ""
    ),
    // the node is mutated dynamically immediately after the metadata node is inserted
    "oninsert");
  
  
  // Create aggregation edges to link standard entities together (The 3 aggregations are not standard and must be configured on the server)
  const geo_person = providerFactory.createAggregationEdgeType([geo, person], "Geo_Person");
  const company_person = providerFactory.createAggregationEdgeType([company, person], "Company_Person");
  const geo_company = providerFactory.createAggregationEdgeType([geo, company], "Geo_Company");
  
  const expandCompany = providerFactory.createAggregationEdgeType([company, person], "person", undefined, "manual");

  // Return list of providers
  const aggProvider = providerFactory.createAggregationProvider([geo_person, company_person, geo_company, expandCompany]);
  return [
    // Aggregation provider
    aggProvider,
    // Dynamic node provider that transform people nodes (in particular it changes their appearance)
    providerFactory.createDynamicNodeProvider(person, [], true, "People", [aggProvider]) // The dynamic nodes are mutate "on insert", meaning we fire multiple search queries to retrieve when new nodes from geo_person and/or cpy_person are created
  ];

}

