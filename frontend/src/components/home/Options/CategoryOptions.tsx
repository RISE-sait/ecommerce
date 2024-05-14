import client from "@/helpers/apollo";
import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";
import { CategoriesListItem } from "./CSRCategoryOptions";

export default function CategoryOptions() {
    return <>
        <h3 className="text-2xl  font-semibold">Shop by Category</h3>
        <InitialCategoriesListing />
    </>
}

async function InitialCategoriesListing() {

    const GetProductsQuery: DocumentNode =
        gql`
                        query  {
                            info
                    {
                        subtypes
                    }
                }
            `
    const { data, networkStatus, error } = await client.query({
        query: GetProductsQuery,
    });

    const subtypes: string[] = data.info.subtypes

    return <>{subtypes.map(subtype => (
        <CategoriesListItem key={subtype + "ssr"} parentSubtypes={[]} subtype={subtype} />
    ))}</>
}