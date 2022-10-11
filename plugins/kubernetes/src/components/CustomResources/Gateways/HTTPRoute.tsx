/* eslint-disable notice/notice */
// Copyright (c) Tetrate, Inc 2022 All Rights Reserved.

import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Button,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StructuredMetadataTable } from '@backstage/core-components';
import { DefaultCustomResourceDrawer } from '../DefaultCustomResourceDrawer';

type HTTPRouteAccordionProps = {
  resource: any;
  resourceName: string;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
};

type HTTPRouteAccordionsProps = {
  resources: any[];
  resourceName: string;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
};

type HTTPRouteSummaryProps = {
  resource: any;
  resourceName: string;
  children?: React.ReactNode;
};

const HTTPRouteSummary = ({
  resource,
  resourceName,
}: HTTPRouteSummaryProps) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid xs={3} item direction="column">
        <DefaultCustomResourceDrawer
          customResource={resource}
          customResourceName={resourceName}
        />
      </Grid>
      <Grid item xs>
        <Divider style={{ height: '5em' }} orientation="vertical" />
      </Grid>
      <Grid item xs="auto">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Grid>
    </Grid>
  );
};

const HTTPRouteAccordion = ({
  resource,
  resourceName,
  defaultExpanded,
}: HTTPRouteAccordionProps) => {
  // Prepare data to render.
  const metadata = { hostnames: [], gateways: [], rules: [] };
  metadata.hostnames = resource.spec.hostnames;
  metadata.gateways = resource.spec.parentRefs.map((ref: any) => {
    return { name: ref.name, kind: ref.kind, group: ref.group };
  });
  metadata.rules = resource.spec.rules.map((rule: any) => {
    return {
      ports: rule.backendRefs.map((ref: any) => ref.port),
      paths: rule.matches.map((match: any) => {
        return { path: match.path.value, type: match.path.type };
      }),
    };
  });

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <HTTPRouteSummary resource={resource} resourceName={resourceName} />
      </AccordionSummary>
      <AccordionDetails>
        {resource.hasOwnProperty('status') && (
          <StructuredMetadataTable metadata={metadata} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export const HTTPRouteAccordions = ({
  resources,
  resourceName,
  defaultExpanded = false,
}: HTTPRouteAccordionsProps) => (
  <Grid
    container
    direction="column"
    justifyContent="flex-start"
    alignItems="flex-start"
  >
    {resources.map((cr, i) => (
      <Grid container item key={i} xs>
        <Grid item xs>
          <HTTPRouteAccordion
            defaultExpanded={defaultExpanded}
            resource={cr}
            resourceName={resourceName}
          />
        </Grid>
      </Grid>
    ))}
  </Grid>
);
