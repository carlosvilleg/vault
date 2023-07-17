// Copyright (c) HashiCorp, Inc.
// SPDX-License-Identifier: MPL-2.0

package audit

import (
	"context"

	"github.com/hashicorp/eventlogger"
)

// NoopSink is a sink node which handles ignores everything.
type NoopSink struct{}

// NewNoopSink should be used to create a new NoopSink.
func NewNoopSink() (*NoopSink, error) {
	return &NoopSink{}, nil
}

// Process is a no-op and always returns nil event and nil error.
func (s *NoopSink) Process(ctx context.Context, e *eventlogger.Event) (*eventlogger.Event, error) {
	// return nil for the event to indicate the pipeline is complete.
	return nil, nil
}

// Reopen is a no-op and always returns nil.
func (s *NoopSink) Reopen() error {
	return nil
}

// Type describes the type of this node (sink).
func (s *NoopSink) Type() eventlogger.NodeType {
	return eventlogger.NodeTypeSink
}
